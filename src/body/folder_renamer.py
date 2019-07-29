import os, inspect

def rename_files(dir, scriptdir):
    for filename in os.listdir(scriptdir + '/' + dir):
      if filename.startswith(dir + '_'):
          newname = filename.replace(dir + '_', '')
          os.rename(scriptdir + '/' + dir + '/' + filename,scriptdir + '/' + dir + '/' + newname)


scriptdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
dirs = os.listdir(scriptdir)
total = 0
for dir in dirs:
    if os.path.isdir(dir):
        print dir
        rename_files(dir, scriptdir)