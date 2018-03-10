from __future__ import unicode_literals
from lektor.pluginsystem import Plugin

import os


class SessionIDPlugin(Plugin):
    name = 'sessionid'
    description = 'Auto-fill next session id in Lektor Admin'

    def on_server_spawn(self, **extra):
        """Monkey-patch render_template call to inject custom JS.

        The JS read the next session_id from DOM (also injected) and
        sets it to second input field after 2 seconds.

        Ugly as fuck, but it works! :P
        """

        import lektor.admin.modules.dash
        original_render_template = lektor.admin.modules.dash.render_template

        def render_template(template):
            import os
            sessions = os.path.join(os.getcwd(), 'content/sessions')
            last_id = 1

            for session in os.listdir(sessions):
                if not os.path.isdir(os.path.join(sessions, session)):
                    continue
                if not session.startswith('2018_'):
                    continue

                id_ = int(session.split('2018_')[1])
                if id_ > last_id:
                    last_id = id_

            session_id = '2018_{}'.format(last_id + 1)
            response = original_render_template(template)
            response = response.replace(
                '</title>\n',
                '</title>\n<p id="next-session-id" style="display:none">{}</p>\n'.format(
                    session_id),
            )
            response = response.replace(
                '<script type=text/javascript src="/admin/static/gen/app.js"></script>\n',
                '<script type=text/javascript src="/admin/static/gen/app.js"></script>\n' +
                '<script type=text/javascript>\n' +
                'function getElementByXpath(path) {\n' +
                '   return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;\n' +
                '}\n' +
                'var aWhile = 2000; // 2 seconds\n' +
                'var setSessionID = function() {\n' +
                '   var input = getElementByXpath(\'//div[@class="edit-area"]/div[@class="row field-row"][2]//input\')\n' +
                '   input.value = document.getElementById("next-session-id").innerHTML\n' +
                '}\n' +
                'if (window.location.pathname.indexOf("root:sessions/add-child") !== -1) {\n' +
                '   setTimeout( setSessionID, aWhile );\n' +
                '}\n' +
                '</script>'
            )
            return response

        lektor.admin.modules.dash.render_template = render_template
