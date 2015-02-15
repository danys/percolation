nitemsdim=50;
width=20;
space=3;
window.onload=function(){init(nitemsdim,width,space)};
function initFunc(cntxt,nitemsdim,width,space)
{
	cntxt.fillStyle = "#ffffff";
	cntxt.fillRect(0,0,nitemsdim*(space+1)+width*nitemsdim,nitemsdim*(space+1)+width*nitemsdim);
	paintGrid(cntxt,nitemsdim,width,space);
}
function runFunc(cntxt,nitemsdim,width,space)
{
	var i,j;
	cntxt.fillStyle = "#000000";
	//Paint every cell black
	for(i=1;i<=nitemsdim;i++)
	{
		for(j=1;j<=nitemsdim;j++)
		{
			cntxt.fillRect((i-1)*width+space*i,(j-1)*width+space*j,width,width);
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
function init(nitemsdim,width,space)
{
	var cnvs = document.getElementById("gamecanvas");
	var cntxt = cnvs.getContext("2d");
	paintGrid(cntxt,nitemsdim,width,space);
	var initButton = document.getElementById("initButton");
	initButton.onclick = function(){initFunc(cntxt,nitemsdim,width,space)};
	var runButton = document.getElementById("runButton");
	runButton.onclick = function(){runFunc(cntxt,nitemsdim,width,space)};
}