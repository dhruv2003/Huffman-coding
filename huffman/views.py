from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request,'index.html')  
  
def theory(request):
    return render(request,'theory.html')

def procedure(request):
    return render(request, 'procedure.html')

def pretest(request):
    return render(request, 'pretest.html')

def simulation(request):
    return render(request, 'simulation.html')

def references(request):
    return render(request, 'references.html')

def posttest(request):
    return render(request, 'posttest.html')

def answers(request):
    return render(request, 'answers.html')

def feedback(request):
    return render(request,'feedback.html')