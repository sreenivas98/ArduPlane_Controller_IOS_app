from flask import Flask, request
from drone_program import Connect_vehicle

app = Flask(__name__)

droneObj = None

def convertToIncValue(val,stepSize):
    IncValue = int((val*stepSize*500)+1500)
    if IncValue<=2000:
        return IncValue
    else:
        return 2000

def convertToDecValue(val,stepSize):
    DecValue = 1500-int(((val*(-1))*stepSize*500))
    if DecValue>=1000:
        return DecValue
    else:
        return 1000

@app.route('/arm', methods=['POST'])
def Receive_and_send_commands_arm():
    data = request.json
    print(data)
    global droneObj
    droneObj=Connect_vehicle()
    try:
        if(data["message"]=="ArmDrone" and (not droneObj.isArmed())):
            droneObj.armDrone()
        else:
            return {'message':'Invalid input'}
        return data
    except KeyError:
        return {'message' : 'Invalid key provided, Accepted key - message' }

@app.route('/throttle', methods=['POST'])
def Receive_and_send_commands_throttle():
    data = request.json
    print(droneObj)
    try:
        print(data['body'])
        print(type(data['body']))
        stepSize=float(data['stepSize'])
        if(data['body']=="IncThrottle" and stepSize>=1 and stepSize<=10 and (droneObj is not None)):
            droneObj.changeThrottle(int(10*stepSize))
        elif(data['body']=="DecThrottle" and stepSize>=1 and stepSize<=10 and (droneObj is not None)):
            droneObj.changeThrottle(int(-10*stepSize))
        elif(stepSize<1 or stepSize>10):
            return {'message': 'Invalid input for stepSize, accepts only float values in range of [1,10]'}
        elif(droneObj is None):
            print("Please Arm the Drone first")
            return {'message': 'Please arm the drone first'}
        else:
            return {'message': 'Invalid input for throttle, Accepted string Values: ["IncThrottle","DecThrottle"]'}
        return data
    except ValueError:
        return {'message':'Invalid input, only float values accepted for stepSize of throttle'}
    except KeyError:
        return {'message': 'Invalid key provided for either body or stepSize'}
    

@app.route('/rudder', methods=['POST'])
def Receive_and_send_commands_rudder():
    data = request.json
    try:
        print(data['body'])
        print(type(data['body']))
        rudder = float(data['body'])
        stepSize = float(data['stepSize'])
        if(rudder>0 and rudder<=1 and stepSize>=1 and stepSize<=5 and (droneObj is not None)):
            droneObj.changeRudder(convertToIncValue(rudder,stepSize))
        elif(rudder<=0 and rudder>=-1 and stepSize>=1 and stepSize<=5 and (droneObj is not None)):
            droneObj.changeRudder(convertToDecValue(rudder,stepSize))
        elif(stepSize<1 or stepSize>5):
            return {'message': 'Invalid input for stepSize, accepts only float values in range of [1,5]'}
        elif(droneObj is None):
            print("Please Arm the Drone first")
            return {'message': 'Please arm the drone first'}
        else:
            return {'message': 'Invalid input for rudder, only float values between -1 and 1 both inclusive are accepted'}
        return data
    except ValueError:
        return {'message':'Invalid input, only float values accepted'}
    except KeyError:
        return {'message': 'Invalid key provided for either body or stepSize'}
    

@app.route('/elevator', methods=['POST'])
def Receive_and_send_commands_elevator():
    data = request.json
    print(data)
    try:
        elevator = float(data['body'])
        stepSize = float(data['stepSize'])
        if(elevator>0 and elevator<=1 and stepSize>=1 and stepSize<=5 and (droneObj is not None)):
            droneObj.changeElevation(convertToIncValue(elevator,stepSize))
        elif(elevator<=0 and elevator>=-1 and stepSize>=1 and stepSize<=5 and (droneObj is not None)):
            droneObj.changeElevation(convertToDecValue(elevator,stepSize))
        elif(stepSize<1 or stepSize>5):
            return {'message': 'Invalid input for stepSize, accepts only float values in range of [1,5]'}
        elif(droneObj is None):
            print("Please Arm the Drone first")
            return {'message': 'Please arm the drone first'}
        else:
            return {'message': 'Invalid input for elevator, only float values between -1 and 1 both inclusive are accepted'}
        return data
    except ValueError:
        return {'message':'Invalid input, only float values accepted'}
    except KeyError:
        return {'message': 'Invalid key provided for either body or stepSize'}
      

@app.route('/aileron', methods=['POST'])
def Receive_and_send_commands_aileron():
    data = request.json
    try:
        print(data['body'])
        print(type(data['body']))
        aileron = float(data['body'])
        stepSize = float(data['stepSize'])
        if(aileron>0 and aileron<=1 and stepSize>=1 and stepSize<=5 and (droneObj is not None)):
            droneObj.changeAileron(convertToIncValue(aileron, stepSize))
        elif(aileron<=0 and aileron>=-1 and stepSize>=1 and stepSize<=5 and (droneObj is not None)):
            droneObj.changeAileron(convertToDecValue(aileron, stepSize))
        elif(stepSize<1 or stepSize>5):
            return {'message': 'Invalid input for stepSize, accepts only float values in range of [1,5]'}
        elif(droneObj is None):
            print("Please Arm the Drone first")
            return {'message': 'Please arm the drone first'}
        else:
            return {'message': 'Invalid input for aileron, only float values between -1 and 1 both inclusive are accepted'}
        return data
    except ValueError:
        return {'message':'Invalid input, only float values accepted'}
    except KeyError:
        return {'message': 'Invalid key provided for either body or stepSize'}
