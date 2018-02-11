from __future__ import unicode_literals
from lektor.pluginsystem import Plugin

import os


class BasicAuthPlugin(Plugin):
    name = 'basic-auth'
    description = 'HTTP Basic Auth for Lektor Admin'

    def on_server_spawn(self, **extra):
        from lektor.admin.webui import WebUI
        original__init__ = WebUI.__init__

        def __init__(self, *args, **kwargs):
            original__init__(self, *args, **kwargs)

            if (
                'BASIC_AUTH_USERNAME' in os.environ
                and 'BASIC_AUTH_PASSWORD' in os.environ
            ):
                from flask_basicauth import BasicAuth
                self.config['BASIC_AUTH_USERNAME'] = \
                    os.environ['BASIC_AUTH_USERNAME']
                self.config['BASIC_AUTH_PASSWORD'] = \
                    os.environ['BASIC_AUTH_PASSWORD']
                self.config['BASIC_AUTH_FORCE'] = True
                BasicAuth(self)

        WebUI.__init__ = __init__
