nitemsdim=50;
width=20;
space=3;
numberOpen=0;
maxOpen=2500;
board=new Array(nitemsdim);
uf=new Array(nitemsdim*nitemsdim+2);
stopid=0;
window.onload=function(){init(nitemsdim,width,space)};

function paintCell(cntxt,i,j)
{
	cntxt.fillRect((i-1)*width+space*i,(j-1)*width+space*j,width,width);
}

function initFunc(cntxt,nitemsdim,width,space)
{
	cntxt.fillStyle = "#ffffff";
	cntxt.fillRect(0,0,nitemsdim*(space+1)+width*nitemsdim,nitemsdim*(space+1)+width*nitemsdim);
	paintGrid(cntxt,nitemsdim,width,space);
}

function connected(x,y)
{
	return uf[x]==uf[y];
}

function merge(x,y)
{
	var parentx=uf[x];
	var parenty=uf[y];
	var it;
	for(it=0;it<nitemsdim*nitemsdim+2;it++)
	{
		if (uf[it]==parentx) uf[it]=parenty;
	}
}

function convert2dimto1dim(x,y)
{
	return y*nitemsdim+x+1;
}

function connectNeighbors(x,y)
{
	if (y==0)	merge(convert2dimto1dim(-1,0),convert2dimto1dim(x,y));
	if (((x-1)>=0) && (y>=0) && (board[x-1][y]==0)) merge(convert2dimto1dim(x-1,y),convert2dimto1dim(x,y));
	if ((x>=0) && (y-1>=0) && (board[x][y-1]==0)) merge(convert2dimto1dim(x,y-1),convert2dimto1dim(x,y));
	if (((x+1)<nitemsdim) && (y<nitemsdim) && (board[x+1][y]==0)) merge(convert2dimto1dim(x+1,y),convert2dimto1dim(x,y));
	if ((x<nitemsdim) && (y+1<nitemsdim) && (board[x][y+1]==0)) merge(convert2dimto1dim(x,y+1),convert2dimto1dim(x,y));
	if (y==nitemsdim-1)	merge(convert2dimto1dim(nitemsdim,y),convert2dimto1dim(x,y));
}

function isPercolating()
{
	return uf[0]==uf[nitemsdim*nitemsdim+1];
}

function runFunc(cntxt,nitemsdim,width,space)
{
	initFunc(cntxt,nitemsdim,width,space);
	board=new Array(nitemsdim);
	uf=new Array(nitemsdim*nitemsdim+2);
	var i,j,count;
	cntxt.fillStyle = "#000000";
	count=0;
	uf[0]=0; //stores the top super node
	count++;
	//Paint every cell black
	for(i=1;i<=nitemsdim;i++)
	{
		board[i-1]=new Array(nitemsdim);
		for(j=1;j<=nitemsdim;j++)
		{
			board[i-1][j-1]=1;
			paintCell(cntxt,i,j);
			uf[count]=count;
			count++;
		}
	}
	uf[count]=count;
	numberOpen=0;
	stopid=setInterval(function(){ performIteration(cntxt); }, 2);
}

function performIteration(cntxt)
{
	//Randomly open some cells
	cntxt.fillStyle = "#ffffff";
	var c,r1,r2;
	var found=false;
	while ((numberOpen<maxOpen) && !found && (!isPercolating()))
	{
		r1 = Math.round(Math.random()*(nitemsdim-1));
		r2 = Math.round(Math.random()*(nitemsdim-1));
		if (board[r1][r2]==1)
		{
			board[r1][r2]=0;
			connectNeighbors(r1,r2);
			paintCell(cntxt,r1+1,r2+1);
			numberOpen++;
			found=true;
		}
	}
	if (isPercolating())
	{
		cntxt.fillStyle = "#4b7fcd";
		for(c=1;c<nitemsdim*nitemsdim+1;c++)
		{
			if (uf[c]==uf[0])	paintCell(cntxt,Math.round(((c-1)%nitemsdim)+1),Math.round((c-1)/nitemsdim));
		}
	}
}

function paintGrid(cntxt,nitemsdim,width,space)
{
	cntxt.fillStyle = "#000000";
	var col,row;
	zero=0;
	maxdim=space+(space+width)*nitemsdim;
	for(col=1;col<=nitemsdim+1;col++)
	{
		cntxt.fillRect((col-1)*(width+space),zero,space,maxdim);
	}
	for(row=1;row<=nitemsdim+1;row++)
	{
		cntxt.fillRect(zero,(row-1)*(width+space),maxdim,space);
	}
}

function stop()
{
	clearInterval(stopid);
}

function init(nitemsdim,width,space)
{
	var cnvs = document.getElementById("gamecanvas");
	var cntxt = cnvs.getContext("2d");
	paintGrid(cntxt,nitemsdim,width,space);
	var stopButton = document.getElementById("stopButton");
	stopButton.onclick = function(){stop()};
	var runButton = document.getElementById("runButton");
	runButton.onclick = function(){runFunc(cntxt,nitemsdim,width,space)};
}