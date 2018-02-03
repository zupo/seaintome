from lektor.publisher import Command, Publisher, PublishError
from lektor.pluginsystem import Plugin


class GitHubPlugin(Plugin):
    name = u'GitHub'
    description = u'Support for pushing changes to GitHub.'

    def on_setup_env(self, **extra):
        self.env.publishers['github'] = GitHubPublisher


class GitHubPublisher(Publisher):

    def publish(self, target, credentials=None, **extra):
        for line in Command(['git', 'status']).safe_iter():
            yield line

        for line in Command(['git', 'add', '-A']).safe_iter():
            yield line

        for line in Command(['git', 'commit', '-m', 'Automatic commit by Lektor']).safe_iter():
            yield line

        for line in Command(['git', 'push', 'origin', 'HEAD:master']).safe_iter():
            yield line
