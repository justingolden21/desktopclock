import re
with open('dist/sw.js', 'r+') as f:
	lines = f.readlines()

	arr = lines[1].split('-')
	v_num = re.sub('[^0-9]', '', arr[2])
	v_num = str(int(v_num) + 1)
	arr[2] = 'v' + v_num + '\';\n'
	lines[1] = '-'.join(arr)

	f.seek(0)
	f.writelines(lines)

	print('Incremented to v' + v_num)