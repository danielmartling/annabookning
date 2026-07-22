// /src/server/db/models/index.js

import { sequelize } from "../sequelize.js";

import createUser from "./user.js";
export const User = createUser(sequelize);

import createGroup from "./group.js";
export const Group = createGroup(sequelize);

import createSubgroup from "./subgroup.js";
export const Subgroup = createSubgroup(sequelize);

Group.hasMany(Subgroup, {
    foreignKey: "group_id",
    as: "subgroups",
});

Subgroup.belongsTo(Group, {
    foreignKey: "group_id",
    as: "group",
});


import createActivity from "./activity.js";
export const Activity = createActivity(sequelize);

import createActivityCategory from "./activitycategory.js";
export const ActivityCategory = createActivityCategory(sequelize);

import createActivityTag from "./activitytag.js";
export const ActivityTag = createActivityTag(sequelize);

ActivityCategory.hasMany(Activity, {
    foreignKey: "activity_id",
    as: "activities",
});

Activity.belongsTo(ActivityCategory, {
    foreignKey: "activity_id",
    as: "activity_category",
});

ActivityTag.hasMany(Activity, {
    foreignKey: "activity_id",
    as: "activities",
});

Activity.belongsTo(ActivityTag, {
    foreignKey: "activity_id",
    as: "activity_tag",
});




import createBooking from "./booking.js";
export const Booking = createBooking(sequelize);

Group.hasMany(Booking, {
    foreignKey: "group_id",
    as: "bookings",
})

Booking.belongsTo(Group, {
    foreignKey: "group_id",
    as: "group",
});

Activity.hasMany(Booking, {
    foreignKey: "activity_id",
    as: "bookings",
})

Booking.belongsTo(Activity, {
    foreignKey: "activity_id",
    as: "activity",
});







import createProgramDay from "./programday.js";
export const ProgramDay = createProgramDay(sequelize);




import createHistory from "./history.js";
export const History = createHistory(sequelize);

User.hasMany(History, {
    foreignKey: "user_id",
    as: "history",
});

History.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});