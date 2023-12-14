import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { CONTACTS } from '../data/contacts';

export default function Example() {
    const sections = React.useMemo(() => {
        const sectionsMap = CONTACTS.reduce((acc, item) => {
            const [lastName] = item.name.split(' ').reverse();

            return Object.assign(acc, {
                [lastName[0]]: [...(acc[lastName[0]] || []), item],
            });
        }, {});

        return Object.entries(sectionsMap)
            .map(([letter, items]) => ({
                letter,
                items,
            }))
            .sort((a, b) => a.letter.localeCompare(b.letter));
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: '#f2f2f2' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Contacts</Text>
                </View>

                {sections.map(({ letter, items }) => (
                    <View style={styles.section} key={letter}>
                        <Text style={styles.sectionTitle}>{letter}</Text>
                        <View style={styles.sectionItems}>
                            {items.map(({ img, name, phone }, index) => {
                                return (
                                    <View key={index} style={styles.cardWrapper}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                // handle onPress
                                            }}>
                                            <View style={styles.card}>
                                                {img ? (
                                                    <Image
                                                        alt=""
                                                        resizeMode="cover"
                                                        source={{ uri: img }}
                                                        style={styles.cardImg}
                                                    />
                                                ) : (
                                                    <View style={[styles.cardImg, styles.cardAvatar]}>
                                                        <Text style={styles.cardAvatarText}>{name[0]}</Text>
                                                    </View>
                                                )}

                                                <View style={styles.cardBody}>
                                                    <Text style={styles.cardTitle}>{name}</Text>

                                                    <Text style={styles.cardPhone}>{phone}</Text>
                                                </View>

                                                <View style={styles.cardAction}>
                                                    <FeatherIcon
                                                        color="#9ca3af"
                                                        name="chevron-right"
                                                        size={22}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 24,
    },
    section: {
        marginTop: 12,
        paddingLeft: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    sectionItems: {
        marginTop: 8,
    },
    container: {
        paddingVertical: 24,
        paddingHorizontal: 0,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1d1d1d',
        marginBottom: 12,
    },
    card: {
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    cardWrapper: {
        borderBottomWidth: 1,
        borderColor: '#d6d6d6',
    },
    cardImg: {
        width: 42,
        height: 42,
        borderRadius: 12,
    },
    cardAvatar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9ca1ac',
    },
    cardAvatarText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardBody: {
        marginRight: 'auto',
        marginLeft: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    cardPhone: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: '500',
        color: '#616d79',
        marginTop: 3,
    },
    cardAction: {
        paddingRight: 16,
    },
});