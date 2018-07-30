# coding: utf-8

from fabric.api import run, env, local, lcd, hosts

servers = ['120.27.227.168']
server_app_dir = 'dashboard'
local_source_dir = './dist/*'
env.user = 'ticks'


def sync_source(server):
    cmd = 'rsync -r %s %s@%s:%s'
    local(cmd % (local_source_dir, env.user, server, server_app_dir))
    return True


def deploy_for_one(server):
    if not sync_source(server):
        return False
    return True


@hosts(servers)
def deploy():
    server = env.host_string
    if not deploy_for_one(server):
        print 'deploy failed for %s' % server
