#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime
from fabric.api import *
import os
# 登录用户和主机名：
env.user = 'root'
env.hosts = ['45.77.134.158'] # 如果有多个主机，fabric会自动依次部署
env.password='gsp191954'

def test():
    deploy_to = '/home/public'
    local('cd www&&ls')
    local('ls')    
    with cd(deploy_to):
        run('ls')

# get(remote_path="/tmp/log_extracts.tar.gz", local_path="/logs/new_log.tar.gz")
# # Download a database back-up
# get("/backup/db.gz", "./db.gz")

def upwww():
     #delete .map file
    for f in os.listdir('./www/build'):
        if '.map' in f:
            os.remove('./www/build/'+f)
            
    deploy_to = '/home/public/public2'
    local('cd www&&tar -zcf www.tar.gz .')    
    # local('tar -zcf www.tar.gz .')    
    # local('scp www.tar.gz gsp@changiif.com:%s'%(deploy_to))
    put('www/www.tar.gz', deploy_to)
    local('rm www/www.tar.gz')
    with cd(deploy_to):
        run('tar -zxf www.tar.gz')
        run('rm www.tar.gz')

    
def upapk():
    deploy_to = '/home/public/public2'    
    # local('cd platforms/android/build/outputs/apk&&mv android-debug.apk public2.apk')     
    # local('scp www.tar.gz gsp@changiif.com:%s'%(deploy_to))
    # get('/remote/path/','/local/path/')
    put('platforms/android/build/outputs/apk/public2.apk', deploy_to)

def pack():
    ' 定义一个pack任务 '
    # 打一个tar包：
    tar_files = ['*.py', 'static/*', 'templates/*', 'favicon.ico']
    local('rm -f example.tar.gz')
    local('tar -czvf example.tar.gz --exclude=\'*.tar.gz\' --exclude=\'fabfile.py\' %s' % ' '.join(tar_files))


def deploy():
    ' 定义一个部署任务 '
    # 远程服务器的临时文件：
    remote_tmp_tar = '/tmp/example.tar.gz'
    tag = datetime.now().strftime('%y.%m.%d_%H.%M.%S')
    run('rm -f %s' % remote_tmp_tar)
    # 上传tar文件至远程服务器：
    put('shici.tar.gz', remote_tmp_tar)
    # 解压：
    remote_dist_dir = '/srv/www.example.com@%s' % tag
    remote_dist_link = '/srv/www.example.com'
    run('mkdir %s' % remote_dist_dir)
    with cd(remote_dist_dir):
        run('tar -xzvf %s' % remote_tmp_tar)
    # 设定新目录的www-data权限:
    run('chown -R www-data:www-data %s' % remote_dist_dir)
    # 删除旧的软链接：
    run('rm -f %s' % remote_dist_link)
    # 创建新的软链接指向新部署的目录：
    run('ln -s %s %s' % (remote_dist_dir, remote_dist_link))
    run('chown -R www-data:www-data %s' % remote_dist_link)
    # 重启fastcgi：
    fcgi = '/etc/init.d/py-fastcgi'
    with settings(warn_only=True):
        run('%s stop' % fcgi)
    run('%s start' % fcgi)

def hello(name):
    print 'Hello %s!'%name