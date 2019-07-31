import sys, os, inspect

def file_replace (file, string, replace_string):
    scriptdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
    fd = open(scriptdir + '/' + file).read()
    print 'Scanning ' + str(file)
    if string in fd:
        print 'Changing "{string}" to "{replace_string}"'.format(**locals())
        occs = fd.count(string)
        print 'num of occurences: ' + str(occs)
        fd = fd.replace(string, replace_string)
        f = open(file, 'w')
        f.write(fd)
        f.flush()
        f.close()
        return occs
    else:
        print 'No occurences of "{string}" found.'.format(**locals())
        return 0

def dir_replace (dir, string, replace_string, inner):
    scriptdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
    files = os.listdir(dir)
    total = 0
    for file in files:
        if os.path.isdir(scriptdir +'/' + dir + '/' + file):
            total += dir_replace(dir + file, string, replace_string, True)
        else :
            total += file_replace(dir + '/' + file, string, replace_string)
    if (inner):
        print 'Inner directory ' + str(dir) + '\n' +'Scanned ' + str(len(files)) + ' files. Total changed ' + str(total) + ' strings.'
    else:
        print 'Replacement Finished\n' + 'Scanned ' + str(len(files)) + ' files. Total changed ' + str(total) + ' strings.'
    return total

args = sys.argv

if len(args) == 4:
    init_str = args[2]
    rep_str = args[3]
    filename = args[1]
    print 'Request to change {init_str} in {filename} with {rep_str}'.format(**locals())
    file_replace(filename, init_str, rep_str)
elif len(args) == 5 and args[4] == 'dir':
    init_str = args[2]
    rep_str = args[3]
    filename = args[1]
    print 'Request to change {init_str} in directory {filename} with {rep_str}'.format(**locals())
    dir_replace(filename, init_str, rep_str, False)
else:
    print 'Wrong number of args' + str(len(args))