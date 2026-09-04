import os
import zipfile
import time

def zip_folder(output_filename):
    out_dir = os.path.abspath("out")
    api_dir = os.path.abspath("api")

    with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Add all files and dirs in 'out'
        for root, dirs, files in os.walk(out_dir):
            for d in dirs:
                full_dir = os.path.join(root, d)
                rel_dir = os.path.relpath(full_dir, out_dir).replace('\\', '/') + '/'
                zinfo = zipfile.ZipInfo(rel_dir)
                zinfo.date_time = time.localtime()[:6]
                zinfo.external_attr = 0o40755 << 16  # drwxr-xr-x
                zipf.writestr(zinfo, '')

            for f in files:
                full_file = os.path.join(root, f)
                rel_file = os.path.relpath(full_file, out_dir).replace('\\', '/')
                zinfo = zipfile.ZipInfo(rel_file)
                zinfo.date_time = time.localtime(os.path.getmtime(full_file))[:6]
                zinfo.external_attr = 0o100644 << 16  # -rw-r--r--
                with open(full_file, 'rb') as fp:
                    zipf.writestr(zinfo, fp.read(), zipfile.ZIP_DEFLATED)

        # Add 'api' directory
        for root, dirs, files in os.walk(api_dir):
            for d in dirs:
                full_dir = os.path.join(root, d)
                rel_dir = ('api/' + os.path.relpath(full_dir, api_dir)).replace('\\', '/') + '/'
                zinfo = zipfile.ZipInfo(rel_dir)
                zinfo.date_time = time.localtime()[:6]
                zinfo.external_attr = 0o40755 << 16
                zipf.writestr(zinfo, '')

            for f in files:
                full_file = os.path.join(root, f)
                rel_file = ('api/' + os.path.relpath(full_file, api_dir)).replace('\\', '/')
                zinfo = zipfile.ZipInfo(rel_file)
                zinfo.date_time = time.localtime(os.path.getmtime(full_file))[:6]
                zinfo.external_attr = 0o100644 << 16
                with open(full_file, 'rb') as fp:
                    zipf.writestr(zinfo, fp.read(), zipfile.ZIP_DEFLATED)

    print(f"[OK] Successfully created {output_filename} with Linux POSIX 0755/0644 permissions")

if __name__ == "__main__":
    zip_folder("site_deploy.zip")
