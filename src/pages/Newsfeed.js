/* eslint-disable handle-callback-err */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const newsFeedUrl = 'http://newsapi.org/v2/everything?q=bitcoin&from=2020-04-16&sortBy=publishedAt&apiKey=1848b5465b1449d78d10c2991b1bea98';

class Newsfeed extends Component {
    state = {
        loading: false,
        articles: null,
        newsApiErr: ''
    };

    componentDidMount() {
        this.fetchNews()
    }

    fetchNews() {
        this.setState({ loading: true })
        fetch(newsFeedUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.articles) {
                    this.setState({ articles: data.articles })
                } else {
                    this.setState({ newsApiErr: 'Unable to fetch news. Please try again later' })
                }
            })
            .catch((error) => {
                console.error(error);
                this.setState({ newsApiErr: 'Unable to fetch news. Please try again later' })
            })
            .finally(() => this.setState({ loading: false }));
    }

    formatDate(d) {
        let date = new Date(d);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    }

    renderLoadView() {
        return (
            <ActivityIndicator
                size={'large'}
            />
        );
    }

    renderItem(article) {
        const { title, urlToImage, author, url, publishedAt } = article.item;
        const { navigation } = this.props;
        return (
            <View style={styles.newsView}>
                {urlToImage ?
                    <Image
                        style={styles.newsImage}
                        source={{ uri: urlToImage }}
                    />
                    : null}
                <View style={styles.newsTextView}>
                    <Text style={styles.newsTitleText}>{title}</Text>
                    <Text style={styles.newsAuthorText}>Author: {author}</Text>
                    <TouchableOpacity
                        onPress={() => Linking.openURL(url)}
                    >
                        <Text style={styles.readMoreText}>Read More...</Text>
                    </TouchableOpacity>
                    <Text style={styles.createdTimeText}>{this.formatDate(publishedAt)}</Text>
                </View>
            </View>
        );
    }

    renderListView() {
        return (
            <FlatList
                data={this.state.articles}
                renderItem={(article) => this.renderItem(article)}
                keyExtractor={(index) => JSON.stringify(index)}
                extraData={this.state}
                removeClippedSubviews={false}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ? this.renderLoadView() : this.renderListView()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 20,
    },
    newsView: {
        borderWidth: 0.5,
        borderColor: '#636363',
        borderRadius: 5,
        margin: 30,
        marginTop: 0,
    },
    newsImage: {
        height: 200,
        width: '100%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    newsTextView: {
        padding: 10,
    },
    newsTitleText: {
        fontWeight: 'bold',
        fontSize: 18
    },
    newsAuthorText: {
        fontSize: 15,
        color: '#636363'
    },
    readMoreText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#0044ff',
        textDecorationLine: 'underline'
    },
    createdTimeText: {
        alignSelf: 'flex-end',
        marginTop: 10
    },
});

export default function (props) {
    const navigation = useNavigation();

    return <Newsfeed {...props} navigation={navigation} />;
};