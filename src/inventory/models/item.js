module.exports = {
    name: 'item',
    database: process.env.DATABASE,
    mixins: [],
    schema: {
        item_type: {
            required: true,
            relation: "item_type",
        },
        inventory: {
            required: true,
            relation: "inventory",
        },
        slot: {
            required: true,
            type: "number",
            min: 0
        },
        amount: {
            required: true,
            type: "number",
            min: 1
        },
    },
    lifecycle: {
        read: {
            role: ["everybody"],
        },
        update: {
            modify: ["find_items"],
            rule: ["check_weight", "openable", "has_slot", "is_slot_avaible", "check_item_amount"],
            role: ["system"],
            effect: ["item_out", "item_in"],
        },
        create: {
            modify: ["set_inventory_and_type", "slot_fixer"],
            rule: ["check_weight", "openable", "has_slot", "is_slot_avaible", "check_item_amount"],
            role: ["system"],
            effect: ["item_in"],
        },
        delete: {
            modify: [],
            rule: [],
            role: ["system"],
            effect: ["item_out"],
        },
    }
}