#import vlcがうまくいかない→ファイル名がVLCになってなかった

import vlc
import random
import time


mp=vlc.MediaPlayer()

while True:
    a = random.uniform(1,30)
    b = random.randint(1,5)
    n=str(b)
    time.sleep(a) 
    mp.set_mrl(n+".wav")
    mp.play() 