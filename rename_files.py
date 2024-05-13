import os

def rename_files(folder_path, start_index=1, end_index=1000):
    files = os.listdir(folder_path)
    file_index = start_index
    for file_name in files:
        if file_index > end_index:
            break
        old_file_path = os.path.join(folder_path, file_name)
        new_file_path = os.path.join(folder_path, f'file{file_index}.mp4')
        os.rename(old_file_path, new_file_path)
        file_index += 1

# Replace 'folder_path' with the path of the folder containing the files you want to rename.
folder_path = 'public/api/porn-api/Squirt'

rename_files(folder_path)
