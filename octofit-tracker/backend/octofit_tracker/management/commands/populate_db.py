from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):

        # Clear existing data in correct order (child to parent), delete individually to avoid Djongo unhashable error
        for obj in Activity.objects.all():
            if getattr(obj, 'id', None):
                obj.delete()
        for obj in Workout.objects.all():
            if getattr(obj, 'id', None):
                obj.delete()
        for obj in Leaderboard.objects.all():
            if getattr(obj, 'id', None):
                obj.delete()
        for obj in User.objects.all():
            if getattr(obj, 'id', None):
                obj.delete()
        for obj in Team.objects.all():
            if getattr(obj, 'id', None):
                obj.delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel', description='Marvel Superheroes')
        dc = Team.objects.create(name='DC', description='DC Superheroes')

        # Create Users
        users = [
            User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=marvel),
            User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel),
            User.objects.create(name='Captain America', email='cap@marvel.com', team=marvel),
            User.objects.create(name='Batman', email='batman@dc.com', team=dc),
            User.objects.create(name='Superman', email='superman@dc.com', team=dc),
            User.objects.create(name='Wonder Woman', email='wonderwoman@dc.com', team=dc),
        ]

        # Create Activities
        Activity.objects.create(user=users[0], type='Running', duration=30, date=timezone.now().date())
        Activity.objects.create(user=users[1], type='Cycling', duration=45, date=timezone.now().date())
        Activity.objects.create(user=users[3], type='Swimming', duration=60, date=timezone.now().date())

        # Create Workouts
        w1 = Workout.objects.create(name='Full Body Blast', description='A full body workout')
        w2 = Workout.objects.create(name='Cardio Burn', description='High intensity cardio')
        w1.suggested_for.add(marvel, dc)
        w2.suggested_for.add(marvel)

        # Create Leaderboards
        Leaderboard.objects.create(team=marvel, points=150)
        Leaderboard.objects.create(team=dc, points=120)

        self.stdout.write(self.style.SUCCESS('Test data populated successfully!'))
