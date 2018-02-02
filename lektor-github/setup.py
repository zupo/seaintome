from setuptools import setup

setup(
    name='lektor-github',
    version='0.1',
    description='Push to github from Lektor',
    author='zupo',
    author_email='pypi@nejczupan.com',
    license='MIT',
    zip_safe=False,
    entry_points={
        'lektor.plugins': [
            'github = __init__:GitHubPlugin',
        ]
    },
)
