from __future__ import unicode_literals
from setuptools import setup

setup(
    name='lektor-sessionid',
    version='0.1',
    description='Auto-fill next session id in Lektor Admin',
    author='zupo',
    author_email='pypi@nejczupan.com',
    license='MIT',
    py_modules=['sessionid'],
    entry_points={
        'lektor.plugins': [
            'sessionid = lektor_sessionid:SessionIDPlugin',
        ]
    },
)
