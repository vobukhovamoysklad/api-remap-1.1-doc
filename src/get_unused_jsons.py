import os, sys, codecs

def get_dirs(path):
    files = os.listdir(path)
    dirs = []
    for file in files:
        if (os.path.isdir(path + '/' + file)):
            dirs.append(path + '/' + file)
    return dirs

def list_files(path):
    dirs = get_dirs(path)
    files = []
    for dir in dirs:
        all = os.listdir(dir)
        for item in all:
            if not os.path.isdir(item):
                files.append(str(dir+'/' +item).replace("./", ""))
    return files

def parse_include(line):
    parsed = line.replace('<!-- include(', '')
    parsed = parsed.replace(') -->', '')
    return parsed

def parse_apib(path):
    file = open(path)

    imports = []
    line = file.readline()
    while len(line) > 0:
        if line.find('<!-- include') > -1:
            stringa = parse_include(line)
            stringa = stringa.replace("u\'", "")
            stringa = stringa.replace("\n", "")
            stringa = stringa.replace("\r", "")
            stringa = stringa.replace(' ', '')
            imports.append(stringa)
        line = file.readline()
    return imports


apibs = []
files = os.listdir(os.curdir)
for f in files:
    if f.find('.apib') > -1:
        apibs.append(f)
print apibs
imports = []
for f in apibs:
    loc_imps = parse_apib(f)
    imports.extend(loc_imps)
exfiles = list_files(os.curdir)
dirs = get_dirs(os.curdir)

imports = list(set(imports))
print 'Not used in import jsons:'
final_list = sorted(list(set(exfiles) - set(imports)))
for a in final_list:
    if a.find('.json') > -1:
        print a

