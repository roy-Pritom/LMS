import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { SessionServices } from './session.service';

const getSessionDetails = catchAsync(async (req, res) => {
  const { sessionId } = req.params;
  const result = await SessionServices.getSessionDetails(sessionId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Session retrieved successfully',
    data: result,
  });
});
const scheduleSession = catchAsync(async (req, res) => {
  const { startTime, endTime, channelName } = req.body;
  const { courseId } = req.params;
  const { id } = req.user;
  // console.log(req.body);
  const result = await SessionServices.scheduleSession(
    courseId,
    startTime,
    endTime,
    channelName,
    id,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Session retrieved successfully',
    data: result,
  });
});
const getSessionByTeacher = catchAsync(async (req, res) => {
  const { id } = req.user;
  const result = await SessionServices.getSessionByTeacher(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Session retrieved successfully',
    data: result,
  });
});

export const SessionControllers = {
  getSessionDetails,
  scheduleSession,
  getSessionByTeacher,
};
