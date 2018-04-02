"""Prepare web-ready images from original photos.

This is mainly to reduce repo size so I don't hit GitHub & Heroku limits.

The script goes through all sessions and:
* creates a folder of the same name as session in ./origs/sessions folder
* moves all session photos over to ./origs
* creates web-ready images out of originals and moves them back into session
  folder

The origs/ folder is not tracked with git.

Web-ready means:
* smart-cropped to 1600x820 (biggest size used in site, Lektor takes care of
  smaller sizes/thumbnails)
* lossless JPG optimization (ala smush.it)
* remove metadata
"""

import os


sessions = os.path.join(os.getcwd(), 'content/sessions')
origs = os.path.join(os.getcwd(), 'origs/sessions')

count = 0
for session in os.listdir(sessions):

    # sessions are folders
    if not os.path.isdir(os.path.join(sessions, session)):
        continue

    # create session's folder in origs
    if not os.path.isdir(os.path.join(origs, session)):
        os.mkdir(os.path.join(origs, session))

    # process images, one by one
    for image in os.listdir(os.path.join(sessions, session)):
        count += 1

        # conventions for image naming
        renamed_image = image.lower().replace('.jpeg', '.jpg').replace(' ', '_')

        # I only care about JPGs, really
        if not (
            image.lower().endswith('.jpg')
            or image.lower().endswith('.jpeg')
        ):
            continue

        # this image was already processed, skipping
        if os.path.exists(os.path.join(origs, session, renamed_image)):
            continue

        # move original from content/sessions/ to origs/sessions/
        # and make it lowercase
        print(
            f"Moving {image} to origs/{session}/"
            f"{renamed_image} ..."
        )
        os.rename(
            os.path.join(sessions, session, image),
            os.path.join(origs, session, renamed_image),
        )

        # create a cropped image out of the original
        orig = os.path.join(origs, session, renamed_image)
        new = os.path.join(sessions, session, renamed_image)
        os.system(
            f'convert "{orig}" -resize 1600x820^ -gravity center '
            f'-extent 1600x820 "{new}"'
        )

        # optimize the cropped image
        os.system(f'/Applications/ImageOptim.app/Contents/MacOS/ImageOptim "{new}"')

print(f'Went though {count} images, all done.')
