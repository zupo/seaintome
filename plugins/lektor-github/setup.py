from __future__ import unicode_literals
from setuptools import setup

setup(
    name='lektor-github',
    version='0.1',
    description='Push to github from Lektor Admin',
    author='zupo',
    author_email='pypi@nejczupan.com',
    license='MIT',
    py_modules=['lektor_github'],
    entry_points={
        'lektor.plugins': [
            'github = lektor_github:GitHubPlugin',
        ]
    },
)
