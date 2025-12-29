import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, StatusBar, Linking, Modal, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SideMenu, TopBar, FabButton } from '../../components/common/SideMenu';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { usersService } from '../../api/usersService';
import { appointmentsService, Appointment } from '../../api/appointmentsService';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../../context/AuthContext';
import { MainStackParamList } from '../../navigation/AppNavigator';

interface TeamMember {
    id: string; name: string; email: string; phone: string; role: 'ADMIN' | 'BARBER'; status: 'active' | 'inactive';
}
type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const TeamManagementScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const { user } = useAuth();
    const [menuVisible, setMenuVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [filteredTeam, setFilteredTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [historyVisible, setHistoryVisible] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [memberHistory, setMemberHistory] = useState<Appointment[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState<'BARBER' | 'ADMIN'>('BARBER');
    const [isEditing, setIsEditing] = useState(false);

    if (user?.role !== 'ADMIN') {
        return (
            <SafeAreaView style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
                <Ionicons name="lock-closed-outline" size={64} color={COLORS.danger} />
                <Text style={{ marginTop: 16, color: COLORS.danger, fontSize: 16 }}>Acesso Restrito</Text>
                <TouchableOpacity style={[styles.saveButton, { marginTop: 24, width: 200 }]} onPress={() => navigation.goBack()}>
                    <Text style={styles.saveButtonText}>Voltar</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const fetchTeam = async () => {
        setLoading(true);
        try {
            const data = await usersService.getStaff(searchText);
            setTeam(data);
            setFilteredTeam(data);
        } catch (e) {
            Alert.alert('Erro', 'Falha ao carregar equipe');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => { fetchTeam(); }, [searchText]);

    const handleCall = (phone: string) => Linking.openURL(`tel:${phone}`);
    const openHistory = async (member: TeamMember) => {
        setSelectedMember(member); setLoadingHistory(true); setHistoryVisible(true);
        try {
            const res = await appointmentsService.getAll({ barberId: member.id });
            setMemberHistory(res.data);
        } catch (e) { setMemberHistory([]); } finally { setLoadingHistory(false); }
    };
    const openForm = (member?: TeamMember) => {
        if (member) {
            setIsEditing(true);
            setSelectedMember(member);
            setName(member.name);
            setEmail(member.email);
            setPhone(member.phone);
            setRole(member.role);
        } else {
            setIsEditing(false);
            setSelectedMember(null);
            setName('');
            setEmail('');
            setPhone('');
            setRole('BARBER');
        }
        setFormVisible(true);
    };

    const handleSave = async () => {
        if (!name || !email || !phone) {
            Alert.alert('Preencha todos os campos obrigatórios');
            return;
        }
        setLoading(true);
        try {
            if (isEditing && selectedMember) {
                await usersService.updateStaff(selectedMember.id, { name, email, phone, role });
                Alert.alert('Sucesso', 'Membro atualizado com sucesso!');
            } else {
                await usersService.createStaff({ name, email, phone, role });
                Alert.alert('Sucesso', 'Membro criado com sucesso!');
            }
            setFormVisible(false);
            fetchTeam();
        } catch (e: any) {
            Alert.alert('Erro', e.message || 'Falha ao salvar membro');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (member: TeamMember) => {
        Alert.alert(
            'Excluir membro',
            `Tem certeza que deseja excluir ${member.name}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir', style: 'destructive',
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await usersService.deleteStaff(member.id);
                            Alert.alert('Excluído', 'Membro removido com sucesso!');
                            fetchTeam();
                        } catch (e: any) {
                            Alert.alert('Erro', e.message || 'Falha ao excluir membro');
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };
    const renderMemberItem = ({ item }: { item: TeamMember }) => (
        <TouchableOpacity style={styles.card} onPress={() => openHistory(item)} activeOpacity={0.7}>
            <View style={styles.cardHeader}>
                <View style={[styles.avatarContainer, { backgroundColor: item.role === 'ADMIN' ? COLORS.primary : COLORS.secondaryTint }]}>
                    <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Text style={styles.cardName}>{item.name}</Text>
                    <Text style={styles.cardSubText}>{item.role === 'ADMIN' ? 'Administrador' : 'Barbeiro'}</Text>
                    <Text style={styles.cardPhone}>{item.phone}</Text>
                </View>
                <TouchableOpacity onPress={() => handleCall(item.phone)} style={styles.iconButton}><Ionicons name="call-outline" size={20} color="#3B82F6" /></TouchableOpacity>
                <TouchableOpacity onPress={() => openForm(item)} style={[styles.iconButton, { marginLeft: 8 }]}><Ionicons name="create-outline" size={20} color="#F59E0B" /></TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item)} style={[styles.iconButton, { marginLeft: 8 }]}><Ionicons name="trash-outline" size={20} color="#EF4444" /></TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            <TopBar onMenuPress={() => setMenuVisible(true)} onBellPress={() => { }} onProfilePress={() => { }} searchValue={searchText} onSearchChange={setSearchText} />
            <SideMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onSelect={(label) => {
                    setMenuVisible(false);
                    const normalized = label.toLowerCase();
                    if (normalized === 'dashboard') navigation.navigate('AppointmentsList');
                    else if (normalized === 'agendamentos') navigation.navigate('AppointmentsList');
                    else if (normalized === 'clientes') navigation.navigate('ClientsManagement');
                    else if (normalized === 'equipe') navigation.navigate('TeamManagement');
                    else if (normalized === 'serviços' || normalized === 'servicos') navigation.navigate('AppointmentsList'); // ajuste conforme necessário
                    else if (normalized === 'financeiro') navigation.navigate('FinanceSummary');
                    else if (normalized === 'perfil') navigation.navigate('AppointmentsList'); // ajuste conforme necessário
                }}
                onAddTeamMember={() => openForm()}
            />
            <View style={{ flex: 1 }}>
                <View style={styles.headerTitleContainer}><Text style={styles.pageTitle}>Gestão de Equipe</Text><Text style={styles.pageSubtitle}>{filteredTeam.length} membros</Text></View>
                <FlatList data={filteredTeam} keyExtractor={item => item.id} renderItem={renderMemberItem} contentContainerStyle={styles.listContent} />
            </View>
            {/* Modal de formulário para criar/editar membro */}
            <Modal visible={formVisible} animationType="slide" transparent>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: COLORS.background, padding: 24, borderRadius: 16, width: '90%' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary, marginBottom: 16 }}>{isEditing ? 'Editar Membro' : 'Novo Membro'}</Text>
                        <TextInput placeholder="Nome" value={name} onChangeText={setName} style={{ color: '#fff', borderBottomWidth: 1, borderColor: COLORS.primary, marginBottom: 12 }} placeholderTextColor="#aaa" />
                        <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={{ color: '#fff', borderBottomWidth: 1, borderColor: COLORS.primary, marginBottom: 12 }} placeholderTextColor="#aaa" keyboardType="email-address" autoCapitalize="none" />
                        <TextInput placeholder="Telefone" value={phone} onChangeText={setPhone} style={{ color: '#fff', borderBottomWidth: 1, borderColor: COLORS.primary, marginBottom: 12 }} placeholderTextColor="#aaa" keyboardType="phone-pad" />
                        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                            <TouchableOpacity onPress={() => setRole('BARBER')} style={{ flex: 1, backgroundColor: role === 'BARBER' ? COLORS.primary : '#222', padding: 10, borderRadius: 8, marginRight: 8, alignItems: 'center' }}>
                                <Text style={{ color: '#fff' }}>Barbeiro</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setRole('ADMIN')} style={{ flex: 1, backgroundColor: role === 'ADMIN' ? COLORS.primary : '#222', padding: 10, borderRadius: 8, marginLeft: 8, alignItems: 'center' }}>
                                <Text style={{ color: '#fff' }}>Administrador</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={() => setFormVisible(false)} style={[styles.saveButton, { backgroundColor: '#374151', marginRight: 8 }]}><Text style={styles.saveButtonText}>Cancelar</Text></TouchableOpacity>
                            <TouchableOpacity onPress={handleSave} style={styles.saveButton}><Text style={styles.saveButtonText}>{isEditing ? 'Salvar' : 'Criar'}</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.background },
    headerTitleContainer: { paddingHorizontal: 20, paddingVertical: 10 },
    pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#F9FAFB' },
    pageSubtitle: { fontSize: 14, color: '#9CA3AF' },
    listContent: { padding: 20, paddingBottom: 100 },
    card: { backgroundColor: '#1F2937', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#374151' },
    cardHeader: { flexDirection: 'row', alignItems: 'center' },
    avatarContainer: { width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    avatarText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    cardInfo: { flex: 1 },
    cardName: { fontSize: 16, fontWeight: '600', color: '#F9FAFB' },
    cardSubText: { fontSize: 12, color: COLORS.primary, fontWeight: 'bold' },
    cardPhone: { fontSize: 14, color: '#9CA3AF' },
    iconButton: { padding: 8, backgroundColor: '#253045', borderRadius: 8 },
    saveButton: { backgroundColor: COLORS.primary, padding: 14, borderRadius: 8, alignItems: 'center' },
    saveButtonText: { color: '#FFF', fontWeight: '600' }
});
export default TeamManagementScreen;
