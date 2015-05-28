R = new Mongo.Collection('#r');
G = new Mongo.Collection('#g');
B = new Mongo.Collection('#b');

Sensor = new Mongo.Collection('sensor');

Submitted = new Mongo.Collection('submitted');

SubmittedSchema = new SimpleSchema({
  r: {
    type: String
  },
  g: {
    type: String
  },
  b: {
    type: String
  },
  shown: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  }
});

Submitted.attachSchema(SubmittedSchema);
