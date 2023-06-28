import unittest
from unittest.mock import patch
from flask import Flask
from flask.testing import FlaskClient
from FlaskWebServer import app


class AileronTestCase(unittest.TestCase):
    
    def setUp(self):
        app.config['TESTING'] = True
        self.client = app.test_client()
    
    def test_invalid_step_size(self):
        with patch('FlaskWebServer.droneObj') as mock_droneObj:
            response = self.client.post('/aileron', json={'body': '0.2', 'stepSize': '8'})
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json, {'message': 'Invalid input for stepSize, accepts only float values in range of [1,5]'})
            mock_droneObj.assert_not_called()
    
    def test_invalid_aileron(self):
        with patch('FlaskWebServer.droneObj') as mock_droneObj:
            response = self.client.post('/aileron', json={'body': '1.2', 'stepSize': '1'})
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json, {'message': 'Invalid input for aileron, only float values between -1 and 1 both inclusive are accepted'})
            mock_droneObj.assert_not_called()

    def test_drone_not_armed(self):
        response = self.client.post('/aileron', json={'body': '0.5', 'stepSize': '1'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'message': 'Please arm the drone first'})
    
    def test_invalid_input(self):
        with patch('FlaskWebServer.droneObj') as mock_droneObj:
            response = self.client.post('/aileron', json={'body': 'InvalidInput', 'stepSize': '1'})
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json, {'message':'Invalid input, only float values accepted'})
            mock_droneObj.assert_not_called()
    
    def test_invalid_keyInput(self):
        with patch('FlaskWebServer.droneObj') as mock_droneObj:
            response = self.client.post('/aileron', json={'bodies': 'IncThrottle', 'stepSize': 'Invalid'})
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json, {'message': 'Invalid key provided for either body or stepSize'})
            mock_droneObj.assert_not_called()