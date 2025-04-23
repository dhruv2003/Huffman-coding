from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('theory', views.theory, name="theory"),
    path('procedure', views.procedure, name="procedure"),
    path('pretest', views.pretest, name="pretest"),
    path('simulation', views.simulation, name="simulation"),
    path('posttest', views.posttest, name="posttest"),
    path('references', views.references, name="references"),
    path('answers', views.answers, name="answers"),
    path('feedback', views.feedback, name="feedback"),

]