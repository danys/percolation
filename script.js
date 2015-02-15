nitemsdim=50;
width=20;
space=3;
window.onload=function(){init(nitemsdim,width,space)};

function init(nitemsdim,width,space)
{
	var cnvs = document.getElementById("gamecanvas");
	var cntxt = cnvs.getContext("2d");
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