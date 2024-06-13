'use strict';

/**
 * organization controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::organization.organization', ({ strapi }) => ({
  async create(ctx) {
    strapi.log.info('Create operation started');

    const { data } = ctx.request.body;


    // Save the organization to the database
    const organization = await strapi.entityService.create('api::organization.organization', {
      data,
    });

    return organization;
  },

  async update(ctx) {
    const { id } = ctx.params;

    const { data } = ctx.request.body;
    console.log(ctx.request.body)

    try {
      const organization = await strapi.entityService.update('api::organization.organization', id, {
        data: {
          ...ctx.request.body
        },
      });

      return organization;
    } catch (error) {
      console.log(error)
      ctx.throw(500, 'Error updating organization');
    }
  },
}));
