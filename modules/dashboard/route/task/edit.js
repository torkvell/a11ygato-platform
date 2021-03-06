/*
    @license
    @a11ygato/dashboard
    Copyright (C) 2018 Orange

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
    @license
    This file is part of pa11y-dashboard.

    pa11y-dashboard is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    pa11y-dashboard is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with pa11y-dashboard.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

const presentTask = require('../../view/presenter/task');

module.exports = route;

// Route definition
function route(app) {

    app.express.get('/:id/edit', function(req, res, next) {
        app.ws(req).task(req.params.id).get({}, function(err, task) {
            if(err) return next(err);
            res.render('task/edit', {
                formAction:`/${task.id}/edit`,
                edited:(typeof req.query.edited !== 'undefined'),
                task:presentTask(task),
                isTaskSubPage:true,
                isScenario:task.type === 'scenario'
            });
        });
    });

    app.express.post('/:id/edit', function(req, res) {
        const edits = req.body;
        app.ws(req).task(req.params.id).edit(edits, function(err) {
            if(err){
                edits.id = req.params.id;
                return res.render('task/edit', {
                    error:err,
                    task:edits,
                    isTaskSubPage:true,
                    isScenario:edits.type === 'scenario'
                });
            }
            res.redirect(`/${req.params.id}?edited`);
        });
    });

}
