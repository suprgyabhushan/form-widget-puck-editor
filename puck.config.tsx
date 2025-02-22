import type { Config } from "@measured/puck";

type Props = {
  HeadingBlock: { title: string };
  FormBlock: {
    fields: {
      label: string;
      type: string;
      placeholder?: string;
    }[];
  };
};

export const config: Config<Props> = {
  components: {

    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <h1>{title}</h1>
        </div>
      ),
    },

    FormBlock: {
      fields: {
        fields: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            type: {
              type: "select",
              options: [
                { value: "text", label: "Text" },
                { value: "email", label: "Email" },
                { value: "textarea", label: "Textarea" },
              ],
            },
            placeholder: { type: "text" },
          },
        },
      },
      defaultProps: {
        fields: [
          {
            label: "Text Field",
            type: "text",
            placeholder: "Enter text",
          },
        ],
      },
      render: ({ fields }) => {
        return (
          <form>
            {fields.map((field, index) => (
              <div key={index} style={{ marginBottom: 20 }}>
                <label>{field.label}</label>

                {/* Render different input types based on the field type */}

                {field.type === "textarea" && (
                  <textarea
                    placeholder={field.placeholder}
                    style={{ width: "100%", padding: 8, marginTop: 8 }}
                  />
                )}

                {field.type === "text" && (
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    style={{ width: "100%", padding: 8, marginTop: 8 }}
                  />
                )}

                {field.type === "email" && (
                  <input
                    type="email"
                    placeholder={field.placeholder}
                    style={{ width: "100%", padding: 8, marginTop: 8 }}
                  />
                )}
                
              </div>
            ))}
          </form>
        );
      },
    },

  },
};

export default config;
