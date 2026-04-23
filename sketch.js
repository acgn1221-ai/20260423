let grasses = [];
let fishes = [];
let bubbles = [];
let particles = [];
let ambientBubbles = [];
let corals = [];
let rocks = [];
let jellyfishes = [];
let bgImg;
let starfishes = [];
let sponges = [];
let shrimps = [];
let crabs = [];
let treasureChests = [];
let whale;
let foods = [];
let dories = []; // 新增多利魚陣列
let cleanerFishes = []; // 新增清潔魚陣列
let shark; // 新增鯊魚角色

// 定義每週作業的專屬連結
const assignmentUrls = [
  "https://acgn1221-ai.github.io/20260323/",
  "https://acgn1221-ai.github.io/20260330-2/",
  "https://acgn1221-ai.github.io/20260404/"
];

// 作品對應的描述
const assignmentDescs = [
  "作品一: 網頁裝飾",
  "作品二: 電流急急棒",
  "作品三: 踩地雷"
];

function preload() {
  // 載入背景圖片 (請確保目錄下有 background.jpg)
  // 加入回呼函式，若讀取失敗則將 bgImg 設為 null，確保 draw() 的判斷式能運作
  bgImg = loadImage('background.jpg', 
    () => console.log("背景圖片載入成功"), 
    () => {
      console.warn("找不到 background.jpg，自動切換為動態漸層背景。");
      bgImg = null;
    }
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 初始化 30 株海草
  let grassColors = ['#a3b18a', '#588157', '#3a5a40', '#344e41'];
  for (let i = 0; i < 30; i++) {
    let col = color(random(grassColors));
    grasses.push(new SeaGrass(random(width), height, random(100, 200), col));
  }

  // 初始化 15 個珊瑚
  for (let i = 0; i < 15; i++) {
    corals.push(new Coral(random(width), height));
  }

  // 初始化 20 個岩石
  for (let i = 0; i < 20; i++) {
    rocks.push(new Rock(random(width), height));
  }

  // 初始化海星、海綿與蝦子
  for (let i = 0; i < 8; i++) {
    starfishes.push(new Starfish(random(width), random(height * 0.7, height - 50)));
  }
  for (let i = 0; i < 10; i++) {
    sponges.push(new Sponge(random(width), height));
  }
  for (let i = 0; i < 6; i++) {
    shrimps.push(new Shrimp());
  }
  // 初始化螃蟹
  for (let i = 0; i < 4; i++) {
    crabs.push(new Crab(random(width), height));
  }
  
  // 初始化背景鯨魚
  whale = new Whale();

  // 初始化寶箱
  treasureChests.push(new TreasureChest(width * 0.8, height));

  // 初始化水母
  for (let i = 0; i < 5; i++) {
    jellyfishes.push(new Jellyfish());
  }

  // 初始化三條魚，體型加大並由小到大 (1-3週)
  for (let i = 0; i < 3; i++) {
    let size = map(i, 0, 2, 1.5, 3.0); 
    fishes.push(new Fish(random(width), random(height * 0.3, height * 0.8), size, i + 1));
  }

  // 初始化兩條多利魚 (Dory)
  for (let i = 0; i < 2; i++) {
    dories.push(new Dory(random(width), random(height * 0.3, height * 0.8), 2.0));
  }

  // 初始化清潔魚 (醫生魚)
  for (let i = 0; i < 2; i++) {
    cleanerFishes.push(new CleanerFish(random(width), random(height * 0.3, height * 0.8)));
  }

  // 初始化鯊魚
  shark = new Shark();

  // 初始化三個氣泡對應 1-3 週
  for (let i = 0; i < 3; i++) {
    bubbles.push(new WeekBubble(i + 1));
  }

  // 初始化環境背景小氣泡
  for (let i = 0; i < 50; i++) {
    ambientBubbles.push(new AmbientBubble());
  }
}

function draw() {
  // 使用背景圖片
  if (bgImg) {
    image(bgImg, 0, 0, width, height);
  } else {
    drawUnderwaterBackground();
  }

  // 1. 繪製上方投射的光線
  drawSunRays();

  // 2. 繪製餵食按鈕 UI
  push();
  fill(255, 255, 255, 180);
  stroke(0, 50);
  rect(20, 20, 80, 40, 10);
  fill(50);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text("餵食", 60, 40);
  pop();

  // 3. 更新與顯示背景巨鯨 (在生物之前繪製以保持在背景)
  whale.update();
  whale.display();

  // 顯示背景小氣泡
  for (let ab of ambientBubbles) {
    ab.update();
    ab.display();
  }

  // 顯示岩石
  for (let r of rocks) {
    r.display();
  }

  // 顯示寶箱
  for (let t of treasureChests) {
    t.display();
  }

  // 更新與顯示海星
  for (let s of starfishes) {
    s.update();
    s.display();
  }

  // 顯示海綿
  for (let s of sponges) {
    s.display();
  }

  // 更新與顯示螃蟹
  for (let c of crabs) {
    c.update();
    c.display();
  }

  // 更新與顯示蝦子
  for (let s of shrimps) {
    s.update();
    s.display();
  }

  // 更新與顯示水母
  for (let j of jellyfishes) {
    j.update();
    j.display();
  }

  // 更新與顯示飼料
  for (let i = foods.length - 1; i >= 0; i--) {
    foods[i].update();
    foods[i].display();
    if (foods[i].pos.y > height) foods.splice(i, 1);
  }

  // 顯示珊瑚
  for (let c of corals) {
    c.display();
  }

  // 更新與顯示海草
  for (let g of grasses) {
    g.sway();
    g.display();
  }

  // 更新與顯示魚群
  for (let f of fishes) {
    f.move();
    f.display();
  }

  // 更新與顯示多利魚
  for (let d of dories) {
    d.move();
    d.display();
  }

  // 更新與顯示清潔魚
  for (let cf of cleanerFishes) {
    cf.update();
    cf.display();
  }

  // 更新與顯示鯊魚
  shark.update();
  shark.display();

  // 更新與顯示氣泡
  for (let b of bubbles) {
    b.float();
    b.display();
  }

  // 更新與顯示粒子特效
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}

function drawUnderwaterBackground() {
  // 模擬晝夜更迭：利用正弦函數計算過渡係數 (0 到 1)
  let dayNightFactor = (sin(frameCount * 0.005) + 1) / 2;
  
  // 白天顏色 (較亮)
  let dayTop = color(40, 100, 180);
  let dayBottom = color(15, 45, 90);
  // 夜晚顏色 (深海暗影)
  let nightTop = color(5, 15, 40);
  let nightBottom = color(0, 5, 15);

  let currentTop = lerpColor(nightTop, dayTop, dayNightFactor);
  let currentBottom = lerpColor(nightBottom, dayBottom, dayNightFactor);

  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(currentTop, currentBottom, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawSunRays() {
  let rayCount = 5;
  let dayNightFactor = (sin(frameCount * 0.005) + 1) / 2;
  noStroke();
  fill(255, 255, 255, 20 * dayNightFactor); // 隨晝夜改變光線亮度
  for (let i = 0; i < rayCount; i++) {
    let x = (width / rayCount) * i + (sin(frameCount * 0.01 + i) * 50);
    beginShape();
    vertex(x, 0);
    vertex(x + 100, 0);
    vertex(x - 200, height);
    vertex(x - 400, height);
    endShape(CLOSE);
  }
}

// --- 海草類別 ---
class SeaGrass {
  constructor(x, y, h, col) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.offset = random(1000);
    this.color = col;
  }
  
  sway() {
    // 基本擺動
    this.baseAngle = map(noise(this.offset + frameCount * 0.01), 0, 1, -PI/16, PI/16);
    
    // 滑鼠物理排斥：計算滑鼠與草根部的距離
    let d = dist(mouseX, mouseY, this.x, this.y);
    this.repelX = 0;
    if (d < 150) {
      this.repelX = map(d, 0, 150, (this.x - mouseX) * 0.8, 0);
    }

    // 魚群物理排斥：當小丑魚游過時撥開海草
    for (let f of fishes) {
      let df = dist(f.pos.x, f.pos.y, this.x, this.y);
      if (df < 120 * f.size) {
        this.repelX += map(df, 0, 120 * f.size, (this.x - f.pos.x) * 1.5, 0);
      }
    }
  }
  
  display() {
    push();
    translate(this.x, this.y);
    noFill();
    // 繪製海草本色
    stroke(this.color);
    strokeWeight(15);
    beginShape();
    for (let i = 0; i < 10; i++) {
      let segmentY = map(i, 0, 10, 0, -this.h);
      let segmentX = sin(i * 0.5 + frameCount * 0.02) * (i * 2) + (i/10 * this.repelX);
      vertex(segmentX, segmentY);
    }
    endShape();
    pop();
  }
}

// --- 奇幻魚群類別 (使用 Vertex) ---
class Fish {
  constructor(x, y, size, weekNum) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1.5, -0.5), random(-0.2, 0.2));
    // 小丑魚主色調：橘色
    this.color = color(255, 120, 0);
    this.size = size;
    this.baseSize = size; // 紀錄初始大小
    this.week = weekNum;
    this.wiggleOffset = random(1000);
    this.isHovered = false;
    this.foodEaten = 0; // 追蹤進食數量
    this.lastMealFrame = frameCount; // 紀錄上次進食的時間
    this.isEaten = false; // 是否被吃掉
    this.respawnTimer = 0; // 重生倒數
  }

  move() {
    // 如果被吃掉了，處理重生邏輯
    if (this.isEaten) {
      this.respawnTimer--;
      if (this.respawnTimer <= 0) {
        this.isEaten = false;
        this.pos = createVector(random(width), random(height * 0.3, height * 0.8));
        this.size = this.baseSize; // 重生時恢復原始大小
      }
      return;
    }

    // 偵測滑鼠是否在魚身上
    let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    this.isHovered = d < 40 * this.size;

    // 如果滑鼠沒在身上，才移動
    if (!this.isHovered) {
      // --- 集體逃跑：避開鯊魚 ---
      let dToShark = dist(this.pos.x, this.pos.y, shark.pos.x, shark.pos.y);
      if (dToShark < 300) {
        let flee = p5.Vector.sub(this.pos, shark.pos).setMag(5); // 逃跑速度加快
        this.pos.add(flee);
        this.vel.x = flee.x; // 面向逃跑方向
        // 逃跑時不執行後續找食物邏輯
        return;
      }

      let closestFood = null;
      let minDist = 400;

      // 尋找最近的飼料
      for (let i = foods.length - 1; i >= 0; i--) {
        let df = dist(this.pos.x, this.pos.y, foods[i].pos.x, foods[i].pos.y);
        if (df < minDist) {
          minDist = df;
          closestFood = foods[i];
          // 如果靠得夠近就吃掉
          if (df < 15) {
            foods.splice(i, 1);
            spawnParticles(this.pos.x, this.pos.y, color(255, 215, 0));
            this.foodEaten++;
            this.lastMealFrame = frameCount; // 重置進食計時
            // 吃飼料變大，上限為初始大小 + 0.167 (約 10px，以魚身 60px 計算)
            this.size = min(this.size + 0.02, this.baseSize + 0.167);
            closestFood = null;
          }
        }
      }

      // 飽食度滿 (最大體型) 時加速
      let isFull = this.size >= this.baseSize + 0.166;
      let currentSpeed = isFull ? 1.5 : 1.0;

      if (closestFood) {
        // 往飼料游去
        let steer = p5.Vector.sub(closestFood.pos, this.pos);
        steer.setMag(2 * currentSpeed);
        this.pos.add(steer);
        this.vel.x = steer.x; // 更新面向
      } else {
        this.pos.add(p5.Vector.mult(this.vel, currentSpeed));
        this.pos.y += sin(frameCount * 0.05 + this.wiggleOffset) * 0.8;
      }

      // 長時間不吃 (約 8 秒後) 開始縮小，下限為初始大小 - 0.167 (約 10px)
      if (frameCount - this.lastMealFrame > 480) {
        this.size = max(this.size - 0.0005, this.baseSize - 0.167);
      }

      if (this.pos.x < -100) this.pos.x = width + 100;
      if (this.pos.x > width + 100) this.pos.x = -100;
      
      // 隨機吐泡泡特效 (飽食度滿時機率加倍)
      let bubbleChance = isFull ? 0.8 : 0.4;
      if (frameCount % 120 === 0 && random() < bubbleChance) {
        ambientBubbles.push(new AmbientBubble(this.pos.x, this.pos.y));
      }
    }
  }

  display() {
    if (this.isEaten) return; // 被吃掉時不顯示

    push();
    translate(this.pos.x, this.pos.y);

    // 繪製飽食度血條 (在縮放前繪製，確保 UI 寬度固定且不隨魚體翻轉)
    this.drawSatietyBar();

    scale(this.size);
    if (this.vel.x > 0) scale(-1, 1);

    // 顯示作品名稱
    fill(255, 200);
    textAlign(CENTER);
    textSize(8);
    text("作品 " + this.week, 30, 25);

    // 小丑魚漸層色實作
    let grad = drawingContext.createLinearGradient(0, 0, 60, 0);
    if (this.size >= this.baseSize + 0.166) {
      // 當體型達到最大時：變更為金黃色漸層
      grad.addColorStop(0, '#ffea00');
      grad.addColorStop(0.5, '#ffd000');
      grad.addColorStop(1, '#ffaa00');
      
      // 增加金色發光特效
      drawingContext.shadowBlur = 25;
      drawingContext.shadowColor = 'gold';
    } else {
      grad.addColorStop(0, '#f48c06');
      grad.addColorStop(0.5, '#faa307');
      grad.addColorStop(1, '#ffba08');
    }
    drawingContext.fillStyle = grad;
    
    noStroke();

    // 繪製流線型魚身
    beginShape();
    vertex(0, 0);
    bezierVertex(10, -25, 50, -25, 60, 0);
    bezierVertex(50, 25, 10, 25, 0, 0);
    endShape(CLOSE);

    // 繪製白條紋 (黑邊白底)
    fill(255);
    ellipse(20, 0, 8, 32); // 靠近頭部的條紋縮小
    ellipse(38, 0, 14, 38); // 中間
    ellipse(55, 0, 8, 22);  // 靠近尾部

    // 裝飾性的小凸點 (頭部)
    fill(255, 150);
    circle(10, 5, 2);
    circle(13, 8, 1.5);

    // 側鰭 (胸鰭)
    push();
    translate(28, 8);
    rotate(sin(frameCount * 0.1) * 0.3);
    fill(this.color);
    ellipse(0, 0, 20, 10);
    pop();

    // 魚眼
    fill(255); // 大白眼
    noStroke();
    circle(10, -5, 12); 
    fill(0);
    circle(11, -5, 5); // 小瞳孔

    // 魚尾動畫：使用貝茲曲線繪製更柔軟的尾鰭
    let tailWiggle = sin(frameCount * 0.15 + this.wiggleOffset) * 8;
    beginShape();
    vertex(58, 0);
    bezierVertex(75, -20 + tailWiggle, 85, -15 + tailWiggle, 80, 0);
    bezierVertex(85, 15 + tailWiggle, 75, 20 + tailWiggle, 58, 0);
    endShape(CLOSE);
    pop();

    // 懸停時出現的小資訊框
    if (this.isHovered) {
      this.drawSpeechBubble();
    }
  }

  drawSpeechBubble() {
    let txt = assignmentDescs[this.week - 1];
    push();
    // 回到畫布坐標系
    resetMatrix(); 
    let bw = textWidth(txt) + 30;
    let bh = 35;
    let bx = mouseX + 15;
    let by = mouseY - bh - 20;

    // 畫對話框背景
    fill('#ffc2d1');
    stroke('#ff8fab');
    strokeWeight(2);
    rect(bx, by, bw, bh, 10);

    // 畫對話框小箭頭
    triangle(bx + 10, by + bh, bx + 20, by + bh, bx + 10, by + bh + 10);

    // 畫文字
    fill(50);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text(txt, bx + bw/2, by + bh/2);
    pop();
  }

  clicked() {
    if (this.isEaten) return;

    let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if (d < 40 * this.size) { // 根據體型判定點擊範圍
      let url = assignmentUrls[this.week - 1]; // 取得對應週次的 URL
      select('#assignment-frame').attribute('src', url);
      select('#iframe-container').style('display', 'block');
      spawnParticles(this.pos.x, this.pos.y, this.color);
      playBubbleSound(); // 點擊時播放氣泡音效
    }
  }

  drawSatietyBar() {
    let barWidth = 60;
    let barHeight = 6;
    let yOffset = -35 * this.size; // 讓血條高度隨魚體縮放動態調整
    
    // 計算飽食度百分比 (從最小體型到最大體型)
    let fullness = map(this.size, this.baseSize - 0.167, this.baseSize + 0.167, 0, 1);
    fullness = constrain(fullness, 0, 1);

    noStroke();
    // 血條背景 (半透明黑)
    fill(0, 100);
    rect(-barWidth / 2, yOffset, barWidth, barHeight, 5);
    // 血條主體 (顏色從紅色漸變到綠色)
    let barColor = lerpColor(color(255, 50, 50), color(50, 255, 50), fullness);
    fill(barColor);
    rect(-barWidth / 2, yOffset, barWidth * fullness, barHeight, 5);
  }
}

// --- 新增：多利魚類別 (Dory - Blue Tang) ---
class Dory {
  constructor(x, y, size) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(1, 2), random(-0.2, 0.2));
    this.size = size;
    this.baseSize = size;
    this.lastMealFrame = frameCount;
    this.wiggleOffset = random(1000);
    this.isEaten = false;
    this.respawnTimer = 0;
  }
  move() {
    if (this.isEaten) {
      this.respawnTimer--;
      if (this.respawnTimer <= 0) {
        this.isEaten = false;
        this.pos = createVector(random(width), random(height * 0.3, height * 0.8));
        this.size = this.baseSize;
      }
      return;
    }

    // --- 避開鯊魚 (逃跑邏輯) ---
    let dToShark = dist(this.pos.x, this.pos.y, shark.pos.x, shark.pos.y);
    if (dToShark < 300) {
      let flee = p5.Vector.sub(this.pos, shark.pos).setMag(5);
      this.pos.add(flee);
      this.vel.x = flee.x;
    }

    let closestFood = null;
    for (let i = foods.length - 1; i >= 0; i--) {
      let df = dist(this.pos.x, this.pos.y, foods[i].pos.x, foods[i].pos.y);
      if (df < 15) {
        foods.splice(i, 1);
        this.size = min(this.size + 0.02, this.baseSize + 0.167);
        this.lastMealFrame = frameCount;
      } else if (df < 300) {
        closestFood = foods[i];
      }
    }

    let isFull = this.size >= this.baseSize + 0.166;
    let speed = isFull ? 2.5 : 1.5;

    if (closestFood) {
      let steer = p5.Vector.sub(closestFood.pos, this.pos).setMag(speed);
      this.pos.add(steer);
      this.vel.x = steer.x;
    } else {
      // --- 魚群效應：尋找最近的小丑魚並跟隨 ---
      let targetFish = null;
      let minFishDist = 600;
      for (let f of fishes) {
        let d = dist(this.pos.x, this.pos.y, f.pos.x, f.pos.y);
        if (d < minFishDist) {
          minFishDist = d;
          targetFish = f;
        }
      }

      if (targetFish && minFishDist > 80) {
        // 朝著小丑魚游動，但保持 80px 的距離
        let steer = p5.Vector.sub(targetFish.pos, this.pos).setMag(speed * 0.7);
        this.pos.add(steer);
        this.vel.x = steer.x;
      } else {
        this.pos.x += this.vel.x * (this.vel.x > 0 ? 1 : -1) * speed * 0.5;
        this.pos.y += sin(frameCount * 0.05 + this.wiggleOffset) * 0.8;
      }
    }
    
    if (frameCount - this.lastMealFrame > 480) this.size = max(this.size - 0.0005, this.baseSize - 0.167);
    if (this.pos.x < -100) this.pos.x = width + 100;
    if (this.pos.x > width + 100) this.pos.x = -100;
  }
  display() {
    if (this.isEaten) return;

    push();
    translate(this.pos.x, this.pos.y);
    scale(this.size);
    if (this.vel.x < 0) scale(-1, 1);
    
    // 多利魚發光效果 (飽食時)
    if (this.size >= this.baseSize + 0.166) {
      drawingContext.shadowBlur = 15;
      drawingContext.shadowColor = '#4CC9FE';
    }

    // 身體 (藍色)
    fill('#0000FF');
    noStroke();
    ellipse(0, 0, 50, 40);
    
    // 黑色花紋
    fill(0);
    beginShape();
    vertex(-10, -10);
    bezierVertex(10, -25, 30, -10, 20, 5);
    bezierVertex(10, 10, -10, 0, -10, -10);
    endShape(CLOSE);

    // 黃色尾巴
    fill('#FFFF00');
    triangle(20, 0, 40, -15, 40, 15);
    
    // 眼睛
    fill(255);
    circle(-15, -5, 8);
    fill(0);
    circle(-16, -5, 4);
    pop();
  }
}

// --- 新增：清潔魚類別 (Cleaner Wrasse - 醫生魚) ---
class CleanerFish {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-0.5, 0.5));
  }
  update() {
    // 尋找要清理的目標 (小丑魚或多利魚)
    let allTargets = [...fishes, ...dories].filter(t => !t.isEaten);
    let closest = null;
    let minDist = 400;

    for (let t of allTargets) {
      let d = dist(this.pos.x, this.pos.y, t.pos.x, t.pos.y);
      if (d < minDist) {
        minDist = d;
        closest = t;
      }
    }

    if (closest) {
      let dir = p5.Vector.sub(closest.pos, this.pos);
      if (minDist > 15) {
        // 往目標游動
        dir.setMag(2.5);
        this.pos.add(dir);
        this.vel.x = dir.x;
      } else {
        // 碰撞/清理：觸發粒子特效
        if (frameCount % 30 === 0) {
          spawnParticles(this.pos.x, this.pos.y, color(150, 200, 255, 150));
        }
        // 輕微抖動模擬清理動作
        this.pos.add(p5.Vector.random2D().mult(2));
      }
    } else {
      this.pos.add(this.vel);
    }
    
    if (this.pos.x < -100) this.pos.x = width + 100;
    if (this.pos.x > width + 100) this.pos.x = -100;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    if (this.vel.x < 0) scale(-1, 1);
    noStroke();
    // 醫生魚特徵：藍色細長身體搭配黑色長條紋
    fill(100, 200, 255);
    ellipse(0, 0, 35, 12);
    fill(0);
    rect(-17, -2, 34, 4, 2);
    fill(50, 100, 255);
    triangle(15, 0, 25, -6, 25, 6);
    pop();
  }
}

// --- 新增：鯊魚類別 ---
class Shark {
  constructor() {
    this.pos = createVector(-400, height * 0.4);
    this.vel = createVector(2, 0);
    this.size = 1.0;
  }
  update() {
    // 尋找最近的小魚作為追逐目標
    let targets = [...fishes, ...dories].filter(t => !t.isEaten);
    let closest = null;
    let minDist = 800;
    for (let t of targets) {
      let d = dist(this.pos.x, this.pos.y, t.pos.x, t.pos.y);
      if (d < minDist) {
        minDist = d;
        closest = t;
      }
    }

    if (closest) {
      // 追逐行為
      let chase = p5.Vector.sub(closest.pos, this.pos).setMag(3.2); // 稍微加快鯊魚速度
      this.pos.add(chase);
      this.vel.x = chase.x;

      // 碰撞偵測：如果撞到小魚
      if (dist(this.pos.x, this.pos.y, closest.pos.x, closest.pos.y) < 40) {
        closest.isEaten = true;
        closest.respawnTimer = 300; // 暫時消失 5 秒 (60fps * 5)
        playEatenSound(); // 播放被吃掉音效
        spawnParticles(closest.pos.x, closest.pos.y, color(255, 0, 0, 150)); // 產生一點點紅色的「受傷」粒子
      }
    } else {
      // 平時巡邏
      this.pos.add(this.vel);
    }

    if (this.pos.x > width + 400) this.pos.x = -400;
    if (this.pos.x < -400) this.pos.x = width + 400;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    if (this.vel.x < 0) scale(-1, 1);
    noStroke();
    fill(100, 115, 130); // 鯊魚經典灰藍色
    // 身體
    ellipse(0, 0, 200, 70);
    // 巨大的背鰭
    triangle(-20, -30, 30, -25, -10, -80);
    // 尾鰭
    triangle(-90, 0, -130, -45, -130, 45);
    // 眼睛
    fill(0);
    circle(70, -10, 10);
    // 腮裂
    stroke(0, 60);
    strokeWeight(2);
    for(let i=0; i<3; i++) line(30 + i*8, -15, 30 + i*8, 15);
    pop();
  }
}

// --- 週次氣泡類別 (Iframe 控制) ---
class WeekBubble {
  constructor(weekNum) {
    this.week = weekNum;
    this.pos = createVector(random(width), random(height, height * 1.5));
    this.speed = random(1, 3);
    this.baseR = 40; // 基礎半徑
  }

  float() {
    this.pos.y -= this.speed;
    // 當氣泡超出畫面頂部，重新回到下方
    if (this.pos.y < -50) this.pos.y = height + 50;
  }

  display() {
    // 根據 Y 座標動態計算半徑：由下往上越來越小 (從 40 變到 10)
    this.currentR = map(this.pos.y, height, 0, this.baseR, 10);
    this.currentR = max(this.currentR, 5); // 確保不會小到看不見

    fill(255, 255, 255, 100);
    stroke(255);
    circle(this.pos.x, this.pos.y, this.currentR * 2);
  }

  clicked() {
    let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if (d < this.currentR) {
      let url = assignmentUrls[this.week - 1]; // 取得對應週次的 URL
      select('#assignment-frame').attribute('src', url);
      select('#iframe-container').style('display', 'block');
      spawnParticles(this.pos.x, this.pos.y, color(255, 255, 255, 150));
    }
  }
}

// --- 環境背景氣泡 ---
class AmbientBubble {
  constructor(x, y) {
    if (x !== undefined && y !== undefined) {
      this.pos = createVector(x, y);
      this.vel = createVector(random(-0.5, 0.5), random(-1, -3));
      this.size = random(2, 6);
    } else {
      this.reset();
    }
  }
  reset() {
    this.pos = createVector(random(width), random(height, height * 2));
    this.vel = createVector(0, random(-0.5, -2));
    this.size = random(1, 5);
  }
  update() {
    this.pos.add(this.vel);
    if (this.pos.y < -10) this.reset();
  }
  display() {
    noStroke();
    fill(255, 255, 255, 20); // 降低環境氣泡透明度，減少干擾
    circle(this.pos.x, this.pos.y, this.size);
  }
}

// --- 底部珊瑚類別 ---
class Coral {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // 使用指定的珊瑚/海葵三色
    let palette = ['#ff0054', '#ff5400', '#ffbd00'];
    this.color = color(random(palette)); 
    this.h = random(40, 70);
  }
  display() {
    push();
    translate(this.x, this.y);
    stroke(this.color);
    strokeCap(ROUND); // 圓潤末端
    strokeWeight(12);
    this.drawStructure();
    
    pop();
  }

  // 輔助繪製方法，確保黑邊與主色路徑一致
  drawStructure() {
    push();
    for(let i=0; i<3; i++) {
      rotate(PI/6);
      line(0, 0, 0, -this.h * (1 - i*0.2));
      push();
      translate(0, -this.h * 0.5);
      rotate(PI/4);
      line(0, 0, 0, -this.h * 0.3);
      pop();
    }
    pop();
  }
}

// --- 新增：水母類別 ---
class Jellyfish {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-0.3, 0.3), random(-0.2, -0.6));
    this.size = random(40, 60);
  }
  update() {
    this.pos.add(this.vel);
    if (this.pos.y < -100) this.pos.y = height + 100;
  }
  display() {
    let pulse = sin(frameCount * 0.04) * 8;
    push();
    translate(this.pos.x, this.pos.y);
    
    // 優化水母頭部：半透明漸層與發光
    let jGrad = drawingContext.createRadialGradient(0, 0, 0, 0, 0, this.size/2);
    jGrad.addColorStop(0, 'rgba(200, 230, 255, 0.9)');
    jGrad.addColorStop(1, 'rgba(100, 150, 255, 0.3)');
    drawingContext.fillStyle = jGrad;
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = 'rgba(173, 216, 230, 0.8)';
    
    noStroke();
    // 傘蓋
    beginShape();
    for(let a = PI; a <= TWO_PI; a += 0.1) {
      let x = cos(a) * (this.size + pulse);
      let y = sin(a) * (this.size * 0.6);
      vertex(x, y);
    }
    for(let x = (this.size + pulse); x >= -(this.size + pulse); x -= 10) {
      vertex(x, sin(x * 0.2 + frameCount * 0.1) * 5);
    }
    endShape(CLOSE);
    
    // 簡單的波浪觸手
    stroke(180, 220, 255, 120);
    strokeWeight(2);
    for (let i = -2; i <= 2; i++) {
      let tx = i * 12;
      noFill();
      beginShape();
      for(let j=0; j<8; j++) vertex(tx + sin(frameCount*0.08 + j + i)*10, j*10);
      endShape();
    }
    pop();
  }
}

// --- 新增：海星類別 ---
class Starfish {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = random(30, 45); // 尺寸加大
    this.angle = random(TWO_PI);
    this.floatOffset = random(1000);
  }
  update() {
    // 在水中漂浮
    this.pos.y += sin(frameCount * 0.02 + this.floatOffset) * 0.4;
    this.pos.x += cos(frameCount * 0.01 + this.floatOffset) * 0.2;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    fill('#9d0208'); // 深紅色
    noStroke();
    // 繪製圓角的五角星
    for (let i = 0; i < 5; i++) {
      rotate(TWO_PI / 5);
      ellipse(0, -this.size/2, this.size/2, this.size);
    }
    // 加上可愛的腮紅與小眼睛
    fill(255, 255, 255, 200);
    circle(-3, -2, 4);
    circle(3, -2, 4);
    pop();
  }
}

// --- 新增：海綿類別 ---
class Sponge {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = random(30, 50);
    this.h = random(25, 45);
  }
  display() {
    push();
    translate(this.x, this.y);
    fill(255, 230, 100); // 鮮豔的亮黃色
    noStroke();
    // 繪製成一團球狀珊瑚/海綿
    circle(0, 0, this.w);
    circle(-10, 5, this.w * 0.7);
    circle(10, 5, this.w * 0.7);
    // 加上小圓孔
    fill(200, 180, 50, 100);
    circle(0, -5, 8);
    pop();
  }
}

// --- 新增：蝦子類別 ---
class Shrimp {
  constructor() {
    this.pos = createVector(random(width), random(height * 0.6, height - 30));
    this.vel = createVector(random(-1.2, 1.2), 0); // 速度微調
    this.escapeForce = createVector(0, 0);
    this.speedBoost = 0; // 進食後的加速度
  }
  update() {
    // 偵測滑鼠，若太靠近則快速彈跳
    let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if (d < 80) {
      let pushDir = createVector(this.pos.x - mouseX, this.pos.y - mouseY);
      pushDir.normalize().mult(8); // 彈跳力道
      this.escapeForce = pushDir;
    }

    // 尋找最近的飼料
    let closestFood = null;
    let minDist = 250;
    for (let i = foods.length - 1; i >= 0; i--) {
      let df = dist(this.pos.x, this.pos.y, foods[i].pos.x, foods[i].pos.y);
      if (df < minDist) {
        minDist = df;
        closestFood = foods[i];
        if (df < 15) {
          foods.splice(i, 1);
          spawnParticles(this.pos.x, this.pos.y, color(255, 215, 0));
          this.speedBoost = 5; // 吃飽後衝刺
          closestFood = null;
        }
      }
    }

    if (closestFood) {
      let steer = p5.Vector.sub(closestFood.pos, this.pos);
      steer.setMag(1.5);
      this.pos.add(steer);
      if (steer.x !== 0) this.vel.x = steer.x > 0 ? abs(this.vel.x) : -abs(this.vel.x);
    } else {
      this.pos.x += this.vel.x + (this.vel.x > 0 ? this.speedBoost : -this.speedBoost);
    }

    this.pos.add(this.escapeForce);
    
    // 在水中漂浮效果
    this.pos.y += sin(frameCount * 0.05) * 0.6;
    
    // 阻力：讓彈跳力道隨時間衰減
    this.escapeForce.mult(0.9);
    this.speedBoost *= 0.95; // 加速度慢慢衰減
    
    if(this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    // 限制在底部範圍
    if(this.pos.y < height * 0.5) this.pos.y = height * 0.5;
    if(this.pos.y > height) this.pos.y = height;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y + sin(frameCount * 0.1) * 2);
    if(this.vel.x < 0) scale(-1, 1);
    fill(255, 180, 180);
    noStroke();
    // 擬真分段身體 (加大)
    for(let i=0; i<4; i++) {
      ellipse(i*8, sin(frameCount*0.2 + i)*2, 18 - i*3, 14 - i);
    }
    // 小足
    stroke(255, 180, 180);
    for(let i=0; i<3; i++) line(i*5, 3, i*5 + 2, 8);
    
    stroke(255, 180, 180);
    strokeWeight(1.5);
    line(0, 0, -25, -15); // 長觸角加大
    line(0, 0, -25, -8);
    pop();
  }
}

// --- 新增：螃蟹類別 ---
class Crab {
  constructor(x, y) {
    this.pos = createVector(x, y - 20);
    this.vel = random() < 0.5 ? 0.8 : -0.8;
    this.w = 50; // 尺寸加大
    this.fleeTimer = 0;
    this.speedBoost = 0;
  }
  update() {
    let closestFood = null;
    let minDist = 300;

    // 如果沒在逃跑，就尋找飼料
    if (this.fleeTimer <= 0) {
      for (let i = foods.length - 1; i >= 0; i--) {
        let df = dist(this.pos.x, this.pos.y, foods[i].pos.x, foods[i].pos.y);
        if (df < minDist) {
          minDist = df;
          closestFood = foods[i];
          if (df < 25) {
            foods.splice(i, 1);
            spawnParticles(this.pos.x, this.pos.y, color(255, 215, 0));
            this.speedBoost = 4; // 吃飽後衝刺
            closestFood = null;
          }
        }
      }
    }

    if (this.fleeTimer > 0) {
      this.pos.x += this.vel * 6; // 逃跑中
      this.fleeTimer--;
    } else if (closestFood) {
      // 螃蟹橫向快速趕往飼料
      if (closestFood.pos.x > this.pos.x) this.vel = abs(this.vel);
      else this.vel = -abs(this.vel);
      this.pos.x += this.vel * (3 + this.speedBoost);
    } else {
      this.pos.x += this.vel + (this.vel > 0 ? this.speedBoost : -this.speedBoost); // 平時移動
    }
    
    this.speedBoost *= 0.96;
    
    if (this.pos.x < 0 || this.pos.x > width) this.vel *= -1;
  }
  clicked() {
    let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if (d < this.w) {
      this.fleeTimer = 100; // 啟動逃跑計時器
    }
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    fill('#d00000');
    noStroke();
    
    // 身體
    ellipse(0, 0, this.w, 30);
    
    // 眼睛
    stroke('#d00000');
    strokeWeight(2);
    line(-5, -5, -8, -12);
    line(5, -5, 8, -12);
    noStroke();
    fill(255);
    circle(-8, -12, 6);
    circle(8, -12, 6);
    fill(0);
    circle(-8, -12, 3);
    circle(8, -12, 3);
    
    // 大螯
    fill('#d00000');
    let clawWiggle = sin(frameCount * 0.1) * 5;
    ellipse(-15 - clawWiggle, -5, 12, 10);
    ellipse(15 + clawWiggle, -5, 12, 10);
    pop();
  }
}

// --- 新增：寶箱類別 ---
class TreasureChest {
  constructor(x, y) {
    this.pos = createVector(x, y - 10);
    this.w = 100; // 寶箱再大一點
    this.isOpen = false;
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    strokeWeight(3);
    stroke('#5e3023');
    
    // 箱體
    fill('#8b5a2b');
    rect(-this.w/2, -40, this.w, 40, 5);
    
    // 蓋子
    fill('#a0522d');
    if (this.isOpen) {
      arc(0, -40, this.w, 60, PI, TWO_PI); // 打開的樣子
      // 裡面的金光
      noStroke();
      fill(255, 215, 0, 150 + sin(frameCount*0.1)*50);
      ellipse(0, -45, this.w * 0.7, 30);
    } else {
      rect(-this.w/2, -55, this.w, 20, 10); // 關上的樣子
    }
    pop();
  }
  clicked() {
    let d = dist(mouseX, mouseY, this.pos.x, this.pos.y - 20);
    if (d < this.w) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        playBubbleSound();
        spawnCoins(this.pos.x, this.pos.y - 45); // 噴出金幣
      }
    }
  }
}

// --- 新增：背景巨鯨類別 ---
class Whale {
  constructor() {
    this.reset();
  }
  reset() {
    this.pos = createVector(-600, height * 0.4);
    this.vel = createVector(0.6, 0);
    this.active = false;
    this.timer = 0;
  }
  update() {
    if (!this.active) {
      this.timer++;
      // 每隔一段時間有機會出現
      if (this.timer > 400 && random() < 0.005) this.active = true;
    } else {
      this.pos.add(this.vel);
      this.pos.y += sin(frameCount * 0.01) * 0.5; // 輕微起伏
      if (this.pos.x > width + 600) this.reset();
    }
  }
  display() {
    if (!this.active) return;
    push();
    translate(this.pos.x, this.pos.y);
    fill(100, 150, 220, 40); // 極低透明度，模擬深海背景
    noStroke();
    // 鯨魚主體
    ellipse(0, 0, 450, 220);
    // 尾巴
    beginShape();
    vertex(-200, 0);
    bezierVertex(-350, -80, -400, -100, -420, -20);
    bezierVertex(-380, 0, -380, 0, -420, 20);
    bezierVertex(-400, 100, -350, 80, -200, 0);
    endShape(CLOSE);
    // 眼睛
    fill(255, 30);
    circle(150, -20, 15);
    pop();
  }
}

// --- 底部岩石類別 ---
class Rock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(20, 50);
    this.points = [];
    this.moss = []; // 儲存青苔位置
    for (let i = 0; i < 6; i++) {
      let angle = TWO_PI / 6 * i;
      let r = this.size * random(0.8, 1.2);
      let p = createVector(cos(angle) * r, sin(angle) * r * 0.6);
      this.points.push(p);
      // 50% 機率在頂部長青苔
      if (p.y < 0 && random() < 0.5) {
        this.moss.push({pos: p, s: random(10, 25)});
      }
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    fill(100, 100, 110);
    noStroke();
    // 畫岩石
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
    // 畫青苔/海葵
    fill(50, 180, 50);
    for (let m of this.moss) {
      ellipse(m.pos.x, m.pos.y, m.s, m.s * 0.6);
    }
    pop();
  }
}

// --- 新增：飼料類別 ---
class Food {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1.5, 1.5), random(1, 2.5)); // 增加水平隨機力道
    this.size = 6;
  }
  update() {
    this.pos.add(this.vel);
    this.pos.x += sin(frameCount * 0.05) * 0.5; // 增加隨機飄散的晃動感
  }
  display() {
    fill(139, 69, 19);
    noStroke();
    circle(this.pos.x, this.pos.y, this.size);
  }
}

// --- 粒子效果類別 ---
class Particle {
  constructor(x, y, col) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(2, 6));
    this.lifespan = 255;
    this.color = col;
  }

  update() {
    this.pos.add(this.vel);
    this.lifespan -= 10;
  }

  display() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.lifespan);
    circle(this.pos.x, this.pos.y, random(3, 8));
  }

  isDead() {
    return this.lifespan < 0;
  }
}

function spawnParticles(x, y, col) {
  for (let i = 0; i < 15; i++) {
    particles.push(new Particle(x, y, col));
  }
}

function mousePressed() {
  // 確保瀏覽器音訊環境啟動
  userStartAudio();
  
  // 檢查是否點擊餵食按鈕
  if (mouseX >= 20 && mouseX <= 100 && mouseY >= 20 && mouseY <= 60) {
    // 讓飼料從上方隨機範圍落下飄散
    for (let i = 0; i < 10; i++) {
      foods.push(new Food(random(width * 0.1, width * 0.9), random(-50, 0)));
    }
    return;
  }

  for (let b of bubbles) {
    b.clicked();
  }
  for (let f of fishes) {
    f.clicked();
  }
  for (let c of crabs) {
    c.clicked();
  }
  for (let t of treasureChests) {
    t.clicked();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// 模擬可愛的氣泡音效
function playBubbleSound() {
  if (typeof p5.Oscillator !== 'undefined') {
    let osc = new p5.Oscillator('sine');
    osc.freq(random(800, 1200)); // 高頻氣泡聲
    osc.amp(0.3, 0);
    osc.start();
    osc.amp(0, 0.15, 0.05); // 快速減弱
    setTimeout(() => osc.stop(), 200);
  }
}

// 模擬被吃掉的咬碎音效
function playEatenSound() {
  if (typeof p5.Oscillator !== 'undefined') {
    let osc = new p5.Oscillator('square'); // 使用方波模擬較粗糙的咬碎聲
    osc.freq(200);
    osc.amp(0.4, 0);
    osc.start();
    osc.freq(40, 0.15); // 音頻快速滑落
    osc.amp(0, 0.15, 0.05);
    setTimeout(() => osc.stop(), 200);
  }
}
