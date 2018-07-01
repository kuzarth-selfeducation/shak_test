import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Card } from 'antd';
import { Query } from 'react-apollo';
import Loader from 'components/Loader';
import GET_PROVIDERS from 'api/queries/providersQuery';
import './Main.css';

const { Meta } = Card;

class Main extends Component {
  render() {
    return (
      <Query query={GET_PROVIDERS}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return <p>{error.message}</p>;

          const { providers } = data;

          return (
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
              dataSource={providers}
              renderItem={({ id, name, url, icon_url }) => (
                <List.Item>
                  <Link to={`/refill/${id}`}>
                    <Card
                      hoverable
                      cover={
                        <div className="provider-card-image">
                          <img alt={name} src={icon_url} />
                        </div>
                      }
                    >
                      <Meta title={name} description={url} />
                    </Card>
                  </Link>
                </List.Item>
              )}
            />
          );
        }}
      </Query>
    );
  }
}

export default Main;
