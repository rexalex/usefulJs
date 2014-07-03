var UnitModel = BaseModel.extend({

    // Model Properties
    Id: 1,
    Name: null,
    TypeId: null,
    ResourceUrl: null,
    SideText: null,
    TuteId: null,
    Index: null,
    SectionId: null,
    Duration: null,
    Type: Enums.ModuleTypes.Unit,
    TextContent: "",
    VideoStart: null,
    VideoEnd: null,
    

    /**
     * Initialize Units Controller
     * @param $scope, current controller scope
     */
    init: function (data) {
        this._super("Unit");
        if (data) {
            cloneObject(data, this);
        }
    },

    /**
     * Triggered when controller is about
     * to be destroyed, clear all remaining values.
     */
    destroy: function (event) {
        //OVERRIDE
    }
});
