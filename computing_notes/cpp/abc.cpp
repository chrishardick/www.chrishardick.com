
#ifndef lint
static char abc_cpp_rcsid[]="$Header$";
#endif


/******************************************************************************
**
**  abc.cpp
**
**  Description
**  ===========
**  an example involving inheritance and polymorphism
**
**  TODO:
**
******************************************************************************/


/******************************************************************************
**
**  INCLUDES
**
******************************************************************************/
#include <iostream>

using namespace std;



/******************************************************************************
**
**  MACROS
**
******************************************************************************/


/******************************************************************************
**
**  CLASS DEFINITIONS
**
******************************************************************************/
class CShape
{
	public:	
		CShape();
		CShape(const CShape& cShape);

		virtual ~CShape();

		virtual void Draw() = 0;
};


class CRect : public CShape
{
	public:
		CRect();
		CRect(const CRect& cRect);
		CRect& operator= (const CRect& cRect);
		
		virtual ~CRect();


		virtual void Draw();
};

class CSquare : public CRect
{
	public:
		CSquare();
		CSquare(const CSquare& cSquare);
		CSquare& operator= (const CSquare& cSquare);

		virtual ~CSquare();


		virtual void Draw();
};


/******************************************************************************
**
**  MEMBER FUNCTIONS
**
******************************************************************************/

/**********
 * CShape Member Functions
 **********/

// default constructor
CShape::CShape()
{
	cout << "CShape::CShape()" << endl;
}

// copy constructor
CShape::CShape(const CShape& cShape)
{
	cout << "CShape::CShape(const CShape&)" << endl;
}

// destructor
CShape::~CShape()
{
		cout << "CShape::~CShape()" << endl;
}


/**********
 * CShape Member Functions
 **********/

// default constructor
CRect::CRect()
{
	cout << "CRect::CRect()" << endl;
}

// copy constructor
CRect::CRect(const CRect& cRect)
{
	cout << "CRect::CRect(const CRect&)" << endl;
}

// destructor
CRect::~CRect()
{
	cout << "CRect::~CRect()" << endl;
}

// assignment operator
CRect& CRect::operator= (const CRect& cRect)
{
	cout << "CRect::Operator=()" << endl;

	return *this;
}

// Draw
void CRect::Draw()
{
	cout << "CRect::Draw()" << endl;
}


/**********
 * CSquare Member Functions
 **********/

// default constructor
CSquare::CSquare()
{
	cout << "CSquare::CSquare()" << endl;
}

// copy constructor
CSquare::CSquare(const CSquare& cSquare)
{
	cout << "CSquare::CSquare(const CSquare&)" << endl;
}

// destructor
CSquare::~CSquare()
{
	cout << "CSquare::~CSquare()" << endl;
}

// assigment operator
CSquare& CSquare::operator= (const CSquare& cSquare)
{
	cout << "CSquare::Operator=()" << endl;
	
	return *this;
}

// Draw
void CSquare::Draw()
{
	cout << "CSquare::Draw()" << endl;
}
	


/******************************************************************************
**
**  EXTERNALS
**
******************************************************************************/


/******************************************************************************
**
**  GLOBALS
**
******************************************************************************/


/******************************************************************************
**
**  STATIC FUNCTIONS/PROTOTYPES
**
******************************************************************************/
static void Voo (CRect cRect);
static void Voo (CRect cRect)
{
	cRect.Draw();
}


static void Roo (CRect& cRect);
static void Roo (CRect& cRect)
{
	cRect.Draw();
}





/******************************************************************************
**
**  MAIN
**
******************************************************************************/
int main (int argc, char* argv[])
{
	CRect cRect; 		cout << endl;

	CSquare cSq; 		cout << endl;

	CRect* cRectPtr[2];
	CRect  cRectVal[2];

	cout << endl;


	cRectPtr[0] = &cRect;
	cRectPtr[1] = &cSq;

	cRectVal[0] = cRect;
	cRectVal[1] = cSq;

 	cout << endl;

	cout << "looping..." << endl;

	for (int i=0;i<2;i++)
	{
		cRectPtr[i]->Draw();

		cRectVal[i].Draw();
	}

	cout << endl;

	cout << "value..." << endl;

	Voo (*cRectPtr[0]);	cout << endl;
	Voo (*cRectPtr[1]);	cout << endl;


	cout << "ref..." << endl;
	
	Roo (cRectVal[0]);	cout << endl;
	Roo (cRectVal[1]);	cout << endl;
	Roo (*cRectPtr[0]);	cout << endl;
	Roo (*cRectPtr[1]);	cout << endl;


	cout << "destructors..." << endl;

	return 0;
}
