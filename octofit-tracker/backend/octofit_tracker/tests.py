from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User(username='testuser', email='test@example.com', password='testpass')
        user.save()
        self.assertEqual(User.objects.count(), 1)

class TeamModelTest(TestCase):
    def test_create_team(self):
        user = User(username='testuser', email='test@example.com', password='testpass')
        user.save()
        team = Team(name='Test Team')
        team.save()
        team.members.add(user)
        self.assertEqual(team.members.count(), 1)

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        user = User(username='testuser', email='test@example.com', password='testpass')
        user.save()
        activity = Activity(user=user, activity_type='Running', duration='01:00:00')
        activity.save()
        self.assertEqual(Activity.objects.count(), 1)

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        user = User(username='testuser', email='test@example.com', password='testpass')
        user.save()
        leaderboard = Leaderboard(user=user, score=100)
        leaderboard.save()
        self.assertEqual(Leaderboard.objects.count(), 1)

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout(name='Test Workout', description='Test Description')
        workout.save()
        self.assertEqual(Workout.objects.count(), 1)
