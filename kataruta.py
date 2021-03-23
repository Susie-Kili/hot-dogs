# -*- coding: utf-8 -*-
"""
Created on Tue Nov 17 14:34:02 2020

@author: takeuchi risa
"""

"""import random 
 
li=["だから","そこで","なんと","なぜなら"]

print(random.choice(li))"""


import tkinter as tk
import random

li=["だから","そのため","そこで","すると","しかし","ところが","にもかかわらず","かつ","また","そして","しかも","さらに","それどころか","そのうえ","一方","あるいは","なぜなら","というのも","ただし","実は","つまり","要するに","例えば","さて"]

def click_func():
    global label
    label["text"] = random.choice(li)

app = tk.Tk()

app.geometry(
    "400x400" # アプリ画面のサイズ
)
app.title(
    "エセかたるた" # アプリのタイトル
)

label = tk.Label(
    app, # ラベルの作成先アプリ
    font = ("System", 30), # ラベルのフォント
    text = random.choice(li)# ラベルに表示するテキスト
)
label.place(
    x = 150, # ラベルの配置先座標x
    y = 150, # ラベルの配置先座標y
)

button = tk.Button(
    app, # ボタンの作成先アプリ
    text = "NEXT", # ボタンに表示するテキスト
    command = click_func
)
# ボタンの配置
button.place(
    x = 300, # ボタンの配置先座標x
    y = 350, # ボタンの配置先座標y
)

app.mainloop()

