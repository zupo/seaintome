from __future__ import unicode_literals
from setuptools import setup

setup(
    name='lektor-basic-auth',
    version='0.1',
    description='HTTP Basic Auth for Lektor Admin',
    author='zupo',
    author_email='pypi@nejczupan.com',
    license='MIT',
    py_modules=['lektor_basic_auth'],
    entry_points={
        'lektor.plugins': [
            'basic-auth = lektor_basic_auth:BasicAuthPlugin',
        ]
    }
)
