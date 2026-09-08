/**
 * A set of functions called "actions" for `send-email`
 */

import { Core } from "@strapi/strapi";
import { Context } from 'koa'

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  send: async (ctx: Context) => {
    try {
      const emailData = ctx.request.body
      await strapi.plugin('email').service('email').send({
        ...emailData,
        to: process.env.SMTP_USER,
      })

      ctx.body = 'ok'
    } catch (err) {
      ctx.body = err
    }
  }
})
