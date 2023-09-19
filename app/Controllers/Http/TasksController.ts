import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Task from "../../Models/Task";
import TaskValidator from "../../Validators/TaskValidator";

export default class TasksController {
  public async index({ response, auth }: HttpContextContract) {
    const user = auth.user; // Get authenticated user

    const tasks = await Task.query()
      .preload("user")
      .where("user_id", user.id)
      .paginate(1, 5); // Get all tasks of the authenticated user & paginate

    if (tasks.length === 0)
      return response.status(404).json({
        message: "No tasks found !",
        data: {},
      }); // If no tasks are found, return a 404 error

    return response.status(200).json({
      message: "All tasks retrieved successfully !",
      data: tasks,
    }); // Return all tasks of the authenticated user
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const user = auth.user; // Get authenticated user
      const payload = await request.validate(TaskValidator); // Validate request
      const task = await user.related("tasks").create(payload); // Create a new task
      return response.created(`${task.title} created !`); // Return a 201 status
    } catch (error) {
      return response.status(400).json({
        message: "We got some issues",
        data: error,
      }); // Return a 400 status
    }
  }

  public async show({ response, params, auth }: HttpContextContract) {
    try {
      const user = auth.user; // Get authenticated user
      const task = await Task.query() // Get all tasks of the authenticated user
        .preload("user") // Load user
        .where("user_id", user.id) // Filter by user
        .where("id", params.id) // Filter by task id
        .firstOrFail(); // Throw an error if task not found
      return response.status(200).json({
        message: "Task retrieved successfully !",
        data: task,
      }); // Return a 200 status
    } catch (error) {
      return response.status(404).json({
        message: "Task not found",
        data: {},
      }); // Return a 404 status
    }
  }

  public async update({ params, response, auth }: HttpContextContract) {
    try {
      const user = auth.user; // Get authenticated user
      const task = await Task.query() // Get all tasks of the authenticated user
        .preload("user") // Load user
        .where("user_id", user.id) // Filter by user
        .where("id", params.id) // // Filter by task id
        .firstOrFail(); // Throw an error if task not found
      task.isCompleted = true; // Update task
      await task.save(); // Save task to database
      // Return a 200 status & task data
      return response.status(200).json({
        message: "Task updated successfully !",
        data: task,
      }); // Return a 200 status
    } catch (error) {
      return response.status(404).json({
        message: "Task not found !",
        data: {},
      }); // Return a 404 status
    }
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    try {
      const user = auth.user; // Get authenticated user
      const task = await Task.query() // Get all tasks of the authenticated user
        .preload("user") // Load user
        .where("user_id", user.id) // Filter by user
        .where("id", params.id) // Filter by task id
        .firstOrFail(); // Throw an error if task not found
      await task.delete(); // Delete task from database
      // Return a 200 status & task data
      return response.status(200).json({
        message: "Task deleted successfully !",
        data: task,
      });
    } catch (error) {
      return response.status(404).json({
        message: "Task not found !",
      }); // Return a 404 status
    }
  }
}
