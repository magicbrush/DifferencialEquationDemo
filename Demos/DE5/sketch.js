var x,y; 
var xx,yy;
var lastTime = 0;

// 函数setup() ：准备阶段
function setup() 
{
	createCanvas(480,480);
	
	// 初值
	x = new Array();
	y = new Array();
	xx = new Array();
	yy = new Array();
	for(var i=0;i<40;i++)
	{
		x[i] = new Array();
		y[i] = new Array();
		xx[i]= new Array();
		yy[i] = new Array();
		for(var j=0;j<40;j++)
		{
			x[i][j] = 10*(i-20);
			y[i][j] = 10*(j-20);
			xx[i][j] = 0;
			yy[i][j] = 0;
		}
	}

	// 中间变量
	lastTime = getTime();
}

// 函数draw()：作画阶段
function draw() {
	fill(255,1);
	rect(0,0,width,height);

	var tNow = getTime(); // 当前时刻
	var dt = tNow - lastTime; // 时差
	//dt = 0.1;

	for(var i=0;i<40;i++)
	{
		for(var j=0;j<40;j++)
		{
			// 获得(i,j)号位置的导数
			var xxij = xx[i][j];
			var yyij = yy[i][j];

			// 获得(i,j)号位置的坐标
			var xij = x[i][j];
			var yij = y[i][j];

			xxij += sin(0.1*yij) * dt;
			yyij += cos(0.1*xij) * dt;

			//为导数赋值
			xx[i][j] = xxij;
			yy[i][j] = yyij;

			// 求出x,y变化后的数值
			xij += xxij*dt;
			yij += yyij*dt;

			// 给(i,j)位置的坐标重新赋值
			x[i][j] = xij;
			y[i][j] = yij;

			// 画出来
			drawDot(xij,yij);
		}
	}

	lastTime = tNow;// 记录时刻
}

function Derivative_0(x,y)
{
	return sin(0.1*y * cos(0.02*y));
}

function Derivative_1(x,y)
{
	return cos(0.1*x * tan(0.03*y));
}

function Derivative_2(x,y)
{
	return sin(0.1*(mouseX-sin(0.045*x)));
}

function Derivative_3(x,y)
{
	return cos(0.1*(mouseY -cos(0.03*y)));
}

function drawDot(x,y)
{
	// 显示出来
	push();
	translate(width/2,height/2);
	translate(x,y);
	scale(50,50);
	fill(0);// 填充白色
	noStroke();
	ellipse(0,0,0.1,0.1); // 画圆形
	pop();
}

function getTime()
{
	return millis()/50;
}
