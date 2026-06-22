const data_format = {
    //新線新坂
    "YD1":"niizaka3","YD1-2-1-1-1":"niizaka2","YD1-1-1":"niizaka1",
    //新線新坂ー地下鉄東台
    "YD2-1-1":"azumadai-niizaka","YD2-1-2":"azumadai-niizaka","YD2-1-3":"azumadai-niizaka","YD2-1-4":"azumadai-niizaka","YD2-1-5":"azumadai-niizaka","YD2-1-6":"azumadai-niizaka","YD2-1-7":"azumadai-niizaka",
    //地下鉄東台ー新線新坂
    "YD1-2-2-1":"niizaka-azumadai","YD1-3-1":"niizaka-azumadai","YD1-2-1":"niizaka-azumadai","YD1-2-2":"niizaka-azumadai","YD1-2-3":"niizaka-azumadai","YD1-2-4":"niizaka-azumadai","YD1-2-5":"niizaka-azumadai","YD1-2-6":"niizaka-azumadai","YD1-2-7":"niizaka-azumadai",
    //地下鉄東台通過線
    "YD3-2-6":"azumadai1pass","YD3-2-7":"azumadai1pass",
    "YD1-2-8":"azumadai2pass",
    //地下鉄東台
    "YD2-1":"azumadai1","YD2-2":"azumadai1",
    "YD1-2-9":"azumadai2","YD1-2-10":"azumadai2",
    //地下鉄東台ー荒江坂
    "YD2-3-1":"azumadai-araesaka","YD2-3-2":"azumadai-araesaka","YD2-3-3":"azumadai-araesaka","YD2-3-4":"azumadai-araesaka","YD2-3-5":"azumadai-araesaka",
    "YD3-2-1":"araesaka-azumadai","YD3-2-2":"araesaka-azumadai","YD3-2-3":"araesaka-azumadai","YD3-2-4":"araesaka-azumadai","YD3-2-5":"araesaka-azumadai",
    //荒江坂
    "YD4-3-8":"araesaka1","YD2-3-5":"araesaka2","YD3-4-1":"araesaka2",
    //荒江坂ー臨海公園通り
    "YD4-3-1":"rinkai-araesaka","YD4-3-2":"rinkai-araesaka","YD4-3-3":"rinkai-araesaka","YD4-3-4":"rinkai-araesaka","YD4-3-5":"rinkai-araesaka","YD4-3-6":"rinkai-araesaka","YD4-3-7":"rinkai-araesaka",
    "YD3-4-2":"araesaka-rinkai","YD3-4-3":"araesaka-rinkai","YD3-4-4":"araesaka-rinkai","YD3-4-5":"araesaka-rinkai",
    //臨海公園通り
    "YD5-4-7":"rinkai1","YD3-4-6":"rinkai2",
    //臨海公園通りー七島台場
    "YD4-5-1":"rinkai-nanasima","YD4-5-2":"rinkai-nanasima","YD4-5-3":"rinkai-nanasima","YD4-5-4":"rinkai-nanasima","YD4-5-5":"rinkai-nanasima","YD4-5-6":"rinkai-nanasima",
    "YD5-4-1":"nanasima-rinkai","YD5-4-2":"nanasima-rinkai","YD5-4-3":"nanasima-rinkai","YD5-4-4":"nanasima-rinkai","YD5-4-5":"nanasima-rinkai","YD5-4-6":"nanasima-rinkai",
    //七島台場
    "YD6-5-9":"nanasima1","YD4-5-7":"nanasima2",
    //七島台場ー玲田橋
    "YD5-6-1":"nanasima-reida","YD5-6-2":"nanasima-reida","YD5-6-3":"nanasima-reida","YD5-6-4":"nanasima-reida","YD5-6-5":"nanasima-reida","YD5-6-6":"nanasima-reida","YD5-6-7":"nanasima-reida","YD5-6-8":"nanasima-reida",
    "YD6-5-1-1-1-1":"reida-nanasima","YD6-5-2":"reida-nanasima","YD6-5-3":"reida-nanasima","YD6-5-4":"reida-nanasima","YD6-5-5":"reida-nanasima","YD6-5-6":"reida-nanasima","YD6-5-7":"reida-nanasima","YD6-5-8":"reida-nanasima",
    //玲田橋
    "YD5-6-9-1-1-1":"reida4","YD6-5-1":"reida4",
    "YD5-6-9":"reida5","YD5-6-10":"reida5",
    "YD5-6-11":"reida6"
};

const For_format = {
    "新線新坂":"サカ","地下鉄東台":"アズ","荒江坂":"アラ","臨海公園通り":"リン","七島台場":"ナナ","玲田橋":"レタ"
}

const url = "https://script.google.com/macros/s/AKfycbzjqAkUoQJcqPHCrfhAA9Xl7pHxh1Vb_N_7GP7HULvxbK9H7i1fJvLvDodjBOoR9KSt/exec";

function fetchJsonData() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("ネットワークエラーが発生しました");
            }
            return response.json();
        })
        .then(data => {
            // クラス名「train-element」を持つ要素（前回の矢印とテキスト）をすべて取得して削除
            const oldElements = document.querySelectorAll(".train-element");
            oldElements.forEach(element => {
                element.remove();
            });

            data.forEach(item => {
                const target = document.getElementById(data_format[item.NowPos]);
                if (!target) return;

                const targetX = Number(target.getAttribute("x1"));
                const targetY = Number(target.getAttribute("y1"));
                const svgCanvas = document.getElementById("svgCanvas");

                // 1. 矢印画像（image）の生成
                const newLine = document.createElementNS("http://www.w3.org/2000/svg", "image");
                newLine.setAttribute("class", "train-element");
                newLine.setAttribute("href", "yajirusi.png");    
                newLine.setAttribute("width", "30");  
                newLine.setAttribute("height", "30");

                const newText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                newText.setAttribute("class", "train-element");
                newText.setAttribute("font-size", "13");
                newText.setAttribute("font-weight", "bold");
                newText.setAttribute("text-anchor", "middle");
                newText.setAttribute("fill", "white");
                newText.textContent = item.TrainNumber + " " + For_format[item.For];

                if (item.joge === 'A') {
                    newLine.setAttribute("transform", `rotate(270, ${targetX}, ${targetY})`);
                    newLine.setAttribute("x", targetX - 15);    
                    newLine.setAttribute("y", targetY + 30); 

                    newText.setAttribute("x", targetX + 50);
                    newText.setAttribute("y", targetY + 30);
                } else {
                    newLine.setAttribute("transform", `rotate(90, ${targetX + 100}, ${targetY})`);
                    newLine.setAttribute("x", targetX + 85);    
                    newLine.setAttribute("y", targetY + 25); 

                    newText.setAttribute("x", targetX + 60);
                    newText.setAttribute("y", targetY - 20);
                }

                svgCanvas.appendChild(newLine);
                svgCanvas.appendChild(newText);
            });
        })
        .catch(error => {
            console.error("エラー:", error);
        });
}

fetchJsonData();
setInterval(fetchJsonData, 10000);