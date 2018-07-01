import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import MaskedInput from 'react-text-mask';
import { Form, InputNumber, Button, Modal, message } from 'antd';
import { clearFormattedPhone, phoneMask, phonePattern } from 'utils/helpers';
import Loader from 'components/Loader';
import GET_PROVIDER from 'api/queries/providerQuery';
import REFILL_PHONE from 'api/mutations/refillMutation';
import './Refill.css';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class Refill extends Component {
  state = {
    isRefilling: false,
  };

  render() {
    const { isRefilling } = this.state;
    const {
      match: {
        params: { id },
      },
      history,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Query query={GET_PROVIDER} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return <p>{error.message}</p>;

          const { provider: { name, icon_url } = {} } = data;

          return (
            <Mutation mutation={REFILL_PHONE}>
              {refillPhone => (
                <Form
                  className="refill"
                  onSubmit={e => {
                    e.preventDefault();
                    const { validateFields } = this.props.form;

                    validateFields(async (err, values) => {
                      if (!err) {
                        this.setState({
                          isRefilling: true,
                        });

                        const { phone, amount } = values;
                        const input = {
                          id,
                          phone_num: clearFormattedPhone(phone),
                          amount: amount,
                        };

                        try {
                          const { data } = await refillPhone({
                            variables: {
                              input,
                            },
                          });

                          const {
                            phone_num,
                            provider_name,
                            amount: amountValue,
                          } = data.refillPhone;

                          Modal.success({
                            title:
                              'You successfully refilled your phone number',
                            content: (
                              <div>
                                <p>Provider: {provider_name}</p>
                                <p>Phone Number: {phone_num}</p>
                                <p>Rubles: {amountValue}</p>
                              </div>
                            ),
                            onOk() {
                              history.push('/');
                            },
                            onCancel() {
                              history.push('/');
                            },
                          });
                        } catch (error) {
                          message.error(
                            error.message.replace('GraphQL error: ', ''),
                          );
                        }

                        this.setState({
                          isRefilling: false,
                        });
                      }
                    });
                  }}
                >
                  <div className="refill__icon-wrapper">
                    <img className="refill__icon" src={icon_url} alt={name} />
                  </div>
                  <FormItem {...formItemLayout} label="Phone Number">
                    {getFieldDecorator('phone', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your phone number!',
                        },
                        {
                          pattern: phonePattern,
                          message:
                            'Please input correct phone number e.g. (555) 555-55-55',
                        },
                      ],
                    })(
                      <MaskedInput
                        className="ant-input"
                        mask={phoneMask}
                        render={(ref, props) => (
                          <span className="ant-input-group-wrapper">
                            <span className="ant-input-wrapper ant-input-group">
                              <span className="ant-input-group-addon">+7</span>
                              <input
                                ref={ref}
                                {...props}
                                placeholder="Enter your phone number"
                                type="text"
                                className="ant-input"
                              />
                            </span>
                          </span>
                        )}
                      />,
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="Amount of Rubles">
                    {getFieldDecorator('amount', {
                      initialValue: 100,
                      rules: [
                        {
                          required: true,
                          message: 'Please input rubles from 1 to 1000',
                        },
                      ],
                    })(
                      <InputNumber
                        className="refill__input-number"
                        min={1}
                        max={1000}
                        step={50}
                        formatter={value =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                      />,
                    )}
                  </FormItem>
                  <FormItem className="refill__button-wrapper">
                    <Button
                      htmlType="submit"
                      type="primary"
                      size="large"
                      loading={isRefilling}
                    >
                      Refill phone number
                    </Button>
                  </FormItem>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default Form.create()(Refill);
