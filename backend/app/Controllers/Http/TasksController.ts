import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import TaskValidator from 'App/Validators/TaskValidator'

export default class TasksController {

  public async list({ auth }: HttpContextContract) {

    await auth.authenticate()

    let tasks = await Task
    .query()
    .where("user_id", auth.user!.id)

    return tasks.map((task) => {
      task.toJSON()
    })

  }

  public async create({ auth, request }: HttpContextContract) {

    await auth.authenticate()

    let task = await request.validate(TaskValidator)

    Task.create({
      'title': task.title,
      'user_id': auth.user!.id
    })

    return "Success"

  }

  public async delete({ auth, request }: HttpContextContract) {

    await auth.authenticate()

    let task_id = request.input('task_id')

    let task = await Task.findOrFail(task_id)

    await task?.delete()

    return "Success"
  }
}
