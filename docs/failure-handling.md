# ARVEN — Failure Handling Strategy

## 1. Introduction

This document describes the expected system behavior when failures occur during ARVEN operations. It identifies initial failure scenarios, component responsibilities, and recovery expectations.

## 2. Failure Scenarios

| Failure scenario | Detection | Expected system response | Recovery strategy |
|---|---|---|---|
| Robot unavailable | Backend sees that the robot is not in the `Available` state. | Reject the new mission request and notify the nurse. | Accept a new request when the robot becomes available. |
| Invalid mission request | Required request data is missing or invalid. | Reject the request and return a validation error. | Correct the request and submit it again. |
| Navigation failure | ROS 2 reports a failed navigation goal or timeout. | Update mission status and notify the Backend. | Attempt controlled recovery if supported; otherwise mark the mission `Failed` and robot `Fault`. |
| RFID read failure | RFID reader does not return a valid tag. | Do not authorize access to patient data. | Allow a limited number of rescanning attempts. |
| Patient identity mismatch | Scanned RFID identifier does not match the patient associated with the mission. | Deny access to the clinical record and log the verification failure. | Request verification again using the correct wristband. |
| Database unavailable | Backend cannot establish a database connection. | Do not return unverified or outdated clinical data. | Retry the connection and restore the operation when the database is available. |
| Backend–robot communication timeout | Backend does not receive an expected response within the configured timeout. | Mark communication as unavailable and prevent new mission assignments. | Restore communication and verify the robot's actual status before resuming. |
| Emergency Stop activated | Hardware emergency-stop circuit is activated. | Actuator power is interrupted independently of the Backend. Record the event when communication permits. | Require inspection and explicit manual reset before returning to operation. |
| Backend service failure | Health Check fails or the service becomes unavailable. | Frontend displays a service-unavailable message. | Restart the service and verify its health before accepting requests. |

## 3. Failure Management Rules

1. A mission must not start unless the robot is available.
2. Patient clinical data must not be displayed before successful identity verification and authorization.
3. Failed RFID scans must not be treated as successful verification.
4. Communication failures must not be interpreted as successful robot execution.
5. Emergency Stop must operate independently of software commands.
6. A robot in `Fault` state must not automatically become `Available`.
7. Recovery operations must be recorded in system logs.
8. A failed mission must retain its failure information for later review.

## 4. Component Responsibilities

| Component | Failure-handling responsibility |
|---|---|
| Frontend | Display error messages and current system status. |
| Backend | Validate requests, manage mission states, record failures, and coordinate recovery. |
| ROS 2 / Nav2 | Report navigation failures and navigation status. |
| ESP32 | Handle embedded communication and hardware-related safety behavior. |
| RFID reader | Provide wristband scan results. |
| Database | Store mission information and system records. |
| Authentication | Prevent unauthorized access to clinical information. |

## 5. Safety Considerations

- Patient identity mismatch must prevent clinical record access.
- Loss of communication must not be interpreted as permission to continue an operation.
- Emergency Stop must remain independent of the application and Backend.
- Robot recovery must require confirmation that the robot is in a safe operating condition.

## 6. Scope and Open Decisions

This is an initial design document, not a completed implementation.

The following values and mechanisms must be finalized during integration:
- RFID retry limit.
- Navigation and communication timeout values.
- Conditions for automatic navigation recovery.
- Fault reset and inspection procedure.
- Exact mission status transitions for each failure.

These decisions must be reviewed with the robotics, firmware, database, and cybersecurity team members.
