import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import React from 'react';

const Items = [
    {
        img: 'test',
        name: 'test',
        phone: '1111'
    }
]

const ContactsView = () => {

    const sections = React.useMemo(() => {
        const sectionsMap = Items.reduce((acc, item) => {
            const [lastName] = item.name.split(' ').reverse()
            const [letter] = lastName

            return Object.assign(acc, {
                [letter]: [...ContactsView(acc[letter] || []), item]
            });
        });
        return Object.entries(sectionsMap)
        .map(([letter, items]) => ({ letter, items }))
        .sort((a, b) => a.letter.localeCompare(b.letter));
    }, []);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#f2f2f2'}}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Contactos</Text>
                </View>
                {sections.map(({letter, items}) => (
                    <View key={letter} style={styles.section}>
                        <Text>{letter}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24
    },
    header: {
        paddingHorizontal: 24
    }, 
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1d1d1d',
        marginBottom: 12
    },
    section: {
        
    }
})

export default ContactsView;