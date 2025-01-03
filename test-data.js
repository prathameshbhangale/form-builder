const fields = [
    {
        fieldId: 1,
        form: { formId: 101, title: "Personal Information Form" },
        label: "First Name",
        type: "text",
        isRequired: true,
        order: 1,
        options: { placeholder: "I agree to the terms" },  // for ingle inputs
        createdAt: new Date("2024-01-01T10:00:00Z"),
        updatedAt: new Date("2024-01-01T10:05:00Z"),
    },
    {
        fieldId: 2,
        form: { formId: 101, title: "Personal Information Form" },
        label: "Age",
        type: "number",
        isRequired: true,
        order: 2,
        options: null,
        createdAt: new Date("2024-01-01T10:00:00Z"),
        updatedAt: new Date("2024-01-01T10:05:00Z"),
    },
    {
        fieldId: 3,
        form: { formId: 101, title: "Personal Information Form" },
        label: "Birthdate",
        type: "date",
        isRequired: false,
        order: 3,
        options: null,
        createdAt: new Date("2024-01-02T11:00:00Z"),
        updatedAt: new Date("2024-01-02T11:05:00Z"),
    },
    {
        fieldId: 4,
        form: { formId: 101, title: "Personal Information Form" },
        label: "Agree to Terms",
        type: "checkbox",
        isRequired: true,
        order: 4,
        options: { label: "I agree to the terms" },
        createdAt: new Date("2024-01-02T11:00:00Z"),
        updatedAt: new Date("2024-01-02T11:10:00Z"),
    },
    {
        fieldId: 5,
        form: { formId: 101, title: "Personal Information Form" },
        label: "Country",
        type: "select",
        isRequired: false,
        order: 5,
        options: { options: ["USA", "Canada", "Mexico"] },
        createdAt: new Date("2024-01-03T12:00:00Z"),
        updatedAt: new Date("2024-01-03T12:10:00Z"),
    },
    {
        fieldId: 6,
        form: { formId: 101, title: "Personal Information Form" },
        label: "Gender",
        type: "radio",
        isRequired: true,
        order: 6,
        options: { options: ["Male", "Female", "Other"] },
        createdAt: new Date("2024-01-03T12:00:00Z"),
        updatedAt: new Date("2024-01-03T12:15:00Z"),
    },
    {
        fieldId: 7,
        form: { formId: 101, title: "Personal Information Form" },
        label: "Personal Info",
        type: "title",
        isRequired: false,
        order: 7,
        options: null,
        createdAt: new Date("2024-01-03T12:00:00Z"),
        updatedAt: new Date("2024-01-03T12:15:00Z"),
    },
    {
        fieldId: 8,
        form: { formId: 101, title: "Personal Information Form" },
        label: "Please provide details",
        type: "subtitle",
        isRequired: false,
        order: 8,
        options: null,
        createdAt: new Date("2024-01-03T12:00:00Z"),
        updatedAt: new Date("2024-01-03T12:20:00Z"),
    },
    {
        fieldId: 9,
        form: { formId: 101, title: "Personal Information Form" },
        label: "Additional comments",
        type: "description",
        isRequired: false,
        order: 9,
        options: null,
        createdAt: new Date("2024-01-03T12:00:00Z"),
        updatedAt: new Date("2024-01-03T12:25:00Z"),
    }
];

const inputTpes = [
    "text","number","checkbox","radio","select","date","textarea"
]