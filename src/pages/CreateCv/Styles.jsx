import { Page, Text, View, Document, StyleSheet, Font, Image, Svg, Path } from "@react-pdf/renderer";

// Register Vietnamese-compatible font
Font.register({
    family: 'Roboto',
    fonts: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf', fontStyle: 'italic' }
    ]
});

const styles = (color) => StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Roboto',
        fontSize: 10,
        lineHeight: 1.6,
        color: '#333333',
    },
    header: {
        flexDirection: 'row',
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        borderBottomStyle: 'solid',
        flexWrap: 'wrap',
    },
    profileImageContainer: {
        marginRight: 20,
    },
    profileImageLarge: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#CCCCCC',
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        objectFit: 'cover',
    },
    headerContent: {
        flex: 1,
        flexShrink: 1,
        lineHeight: 1.5,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    jobTitle: {
        fontSize: 12,
        marginBottom: 8,
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        borderBottomStyle: 'solid',
    },
    motto: {
        fontSize: 10,
        lineHeight: 1.5,
        fontStyle: 'italic',
        color: '#666666',
    },
    section: {
        marginBottom: 15,
        flexGrow: 1,
        width: '100%',
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 8,
        textTransform: 'uppercase',
        borderBottomWidth: 2,
        borderBottomColor: color,
        borderBottomStyle: 'solid',
        borderTopWidth: 2,
        borderTopColor: color,
        borderTopStyle: 'solid',
        paddingBottom: 2,
        paddingTop: 2,
    },
    contentRow: {
        flexDirection: 'row',
        marginBottom: 4,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    icon: {
        width: 16,
        height: 16,
        minWidth: 16,
        borderRadius: 8,
        backgroundColor: color,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 1,
    },
    field: {
        flex: 1,
        fontSize: 10,
        lineHeight: 1.5,
        flexWrap: 'wrap',
        width: '100%',
    },
    timelineContainer: {
        flexDirection: 'row',
        marginBottom: 8,
        flexWrap: 'wrap', // Allow wrapping for timeline content
        minHeight: 50, // Minimum height to ensure visibility
    },
    timelineDot: {
        width: 12,
        height: 12,
        minWidth: 12, // Add minWidth to prevent dot shrinking
        borderRadius: 6,
        backgroundColor: color,
        marginRight: 6,
    },
    timelineBar: {
        width: 2,
        minWidth: 2, // Add minWidth to prevent bar shrinking
        backgroundColor: color,
        marginRight: 10,
        marginLeft: 5,
        flexGrow: 1, // Make the bar grow to fill available space
        minHeight: 40, // Minimum height for the bar
    },
    timelineBarContainer: {
        marginRight: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 50, // Minimum height
        alignSelf: 'stretch', // Stretch to match content height
    },
    timelineContent: {
        flex: 1,
        flexShrink: 1, // Allow content to shrink if needed
        width: 'auto', // Allow width to adjust
    },
    timelinePeriod: {
        fontWeight: 'bold',
        fontSize: 10,
    },
    timelineTitle: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    timelineDescription: {
        fontSize: 9,
        color: '#555555',
        lineHeight: 1.3,
        width: '100%', // Ensure full width for proper wrapping
    },
    rowLayout: {
        flexDirection: 'row',
        marginBottom: 15,
        flexWrap: 'wrap',
        width: '100%',
    },
    column: {
        flex: 1,
        paddingRight: 10,
        minWidth: 150,
        maxWidth: '100%',
        flexShrink: 1,
    },
    fullWidthSection: {
        marginBottom: 15,
        width: '100%',
    },
    lastColumn: {
        paddingRight: 0,
    }
});

// SVG Icons components
const EmailIcon = ({ color }) => (
    <Svg viewBox="0 0 24 24" width={10} height={10}>
        <Path fill={color} d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z" />
    </Svg>
);

const PhoneIcon = ({ color }) => (
    <Svg viewBox="0 0 24 24" width={10} height={10}>
        <Path fill={color} d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5C20.55,15.5 21,15.95 21,16.5V20C21,20.55 20.55,21 20,21C10.61,21 3,13.39 3,4C3,3.45 3.45,3 4,3H7.5C8.05,3 8.5,3.45 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
    </Svg>
);

const WebsiteIcon = ({ color }) => (
    <Svg viewBox="0 0 24 24" width={10} height={10}>
        <Path fill={color} d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M16.9,15.49L16.18,16.2C16.18,16.2 12.38,13 11.8,13C11.23,13 7.43,16.2 7.43,16.2L6.7,15.49C6.7,15.49 10.5,11.7 10.5,11.12C10.5,10.54 6.7,6.76 6.7,6.76L7.43,6.04C7.43,6.04 11.23,9.25 11.8,9.25C12.38,9.25 16.18,6.04 16.18,6.04L16.9,6.76C16.9,6.76 13.1,10.54 13.1,11.12C13.1,11.7 16.9,15.49 16.9,15.49Z" />
    </Svg>
);

const LocationIcon = ({ color }) => (
    <Svg viewBox="0 0 24 24" width={10} height={10}>
        <Path fill={color} d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
    </Svg>
);

export const CVPDF = ({ formData, primaryColor }) => {
    const currentStyles = styles(primaryColor);
    
    // Get arrays with fallback to single item arrays
    const experiences = formData.experiences || [{ period: '', company: '', details: '' }];
    const activities = formData.activities || [{ period: '', project: '', description: '' }];

    return (
        <Document>
            <Page size="A4" style={currentStyles.page} wrap>
                {/* Header with profile info */}
                <View style={currentStyles.header}>
                    <View style={currentStyles.profileImageContainer}>
                        {formData.avatar ? (
                            <Image
                                src={formData.avatar}
                                style={currentStyles.avatarImage}
                            />
                        ) : (
                            <View style={currentStyles.profileImageLarge} />
                        )}
                    </View>
                    <View style={currentStyles.headerContent}>
                        <Text style={currentStyles.name}>{formData.fullName || "Họ và tên"}</Text>
                        <Text style={currentStyles.jobTitle}>{formData.jobTitle || "Vị trí ứng tuyển"}</Text>
                        <Text style={currentStyles.motto}>{formData.motto || "Châm ngôn nghề nghiệp của bạn. Bạn giỏi nhất điều gì và có thể làm"}</Text>
                    </View>
                </View>

                {/* First row layout */}
                <View style={currentStyles.rowLayout}>
                    {/* Personal Information */}
                    <View style={currentStyles.column}>
                        <View style={currentStyles.section}>
                            <Text style={currentStyles.sectionTitle}>Thông tin cá nhân</Text>
                            <View style={currentStyles.contentRow}>
                                <View style={currentStyles.icon}>
                                    <EmailIcon color="white" />
                                </View>
                                <Text style={currentStyles.field}>{formData.email || "Email"}</Text>
                            </View>
                            <View style={currentStyles.contentRow}>
                                <View style={currentStyles.icon}>
                                    <PhoneIcon color="white" />
                                </View>
                                <Text style={currentStyles.field}>{formData.phone || "Số điện thoại"}</Text>
                            </View>
                            <View style={currentStyles.contentRow}>
                                <View style={currentStyles.icon}>
                                    <WebsiteIcon color="white" />
                                </View>
                                <Text style={currentStyles.field}>{formData.website || "Website / Facebook"}</Text>
                            </View>
                            <View style={currentStyles.contentRow}>
                                <View style={currentStyles.icon}>
                                    <LocationIcon color="white" />
                                </View>
                                <Text style={currentStyles.field}>{formData.address || "Địa chỉ"}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Education */}
                    <View style={currentStyles.column}>
                        <View style={currentStyles.section}>
                            <Text style={currentStyles.sectionTitle}>Học vấn</Text>
                            <View style={currentStyles.contentRow}>
                                <Text style={currentStyles.field}>{formData.education || "Tên trường"}</Text>
                            </View>
                            <View style={currentStyles.contentRow}>
                                <Text style={currentStyles.field}>{formData.major || "Ngành học / Môn học"}</Text>
                            </View>
                            <View style={currentStyles.contentRow}>
                                <Text style={currentStyles.field}>{formData.educationDetails || "Mô tả thành tích học tập hoặc thành tích nổi bật"}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Skills */}
                    <View style={[currentStyles.column, currentStyles.lastColumn]}>
                        <View style={currentStyles.section}>
                            <Text style={currentStyles.sectionTitle}>Các kỹ năng</Text>
                            <View style={currentStyles.contentRow}>
                                <Text style={currentStyles.field}>{formData.skills || "Mô tả kỹ năng"}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Experience Section - Full width */}
                <View style={currentStyles.fullWidthSection}>
                    <Text style={currentStyles.sectionTitle}>Kinh nghiệm làm việc</Text>
                    {experiences.map((exp, index) => (
                        <View key={index} style={currentStyles.timelineContainer}>
                            <View style={currentStyles.timelineBarContainer}>
                                <View style={currentStyles.timelineDot} />
                                {index < experiences.length && (
                                    <View style={currentStyles.timelineBar} />
                                )}
                            </View>
                            <View style={currentStyles.timelineContent}>
                                <Text style={currentStyles.timelinePeriod}>
                                    {exp.period || "Bắt đầu — Kết thúc"}
                                </Text>
                                <Text style={currentStyles.timelineTitle}>
                                    {exp.company || "Tên công ty"}
                                </Text>
                                <Text style={currentStyles.timelineDescription}>
                                    {exp.details || "Mô tả kinh nghiệm làm việc cụ thể"}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Second row layout */}
                <View style={currentStyles.rowLayout}>
                    {/* Activities */}
                    <View style={[currentStyles.column, currentStyles.lastColumn]}>
                        <View style={currentStyles.section}>
                            <Text style={currentStyles.sectionTitle}>Hoạt động</Text>
                            {activities.map((activity, index) => (
                                <View key={index} style={currentStyles.timelineContainer}>
                                    <View style={currentStyles.timelineBarContainer}>
                                        <View style={currentStyles.timelineDot} />
                                        {index < activities.length && (
                                            <View style={currentStyles.timelineBar} />
                                        )}
                                    </View>
                                    <View style={currentStyles.timelineContent}>
                                        <Text style={currentStyles.timelinePeriod}>
                                            {activity.period || "Bắt đầu — Kết thúc"}
                                        </Text>
                                        <Text style={currentStyles.timelineTitle}>
                                            {activity.project || "Tên dự án"}
                                        </Text>
                                        <Text style={currentStyles.timelineDescription}>
                                            {activity.description || "Mô tả hoạt động"}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Certificates */}
                    <View style={currentStyles.column}>
                        <View style={currentStyles.section}>
                            <Text style={currentStyles.sectionTitle}>Chứng chỉ</Text>
                            <View style={currentStyles.contentRow}>
                                <Text style={currentStyles.field}>{formData.certificates || "Các chứng chỉ"}</Text>
                            </View>
                        </View>
                    </View>

                </View>

                {/* Third row layout */}
                <View style={currentStyles.rowLayout}>
                    {/* Awards */}
                    <View style={currentStyles.column}>
                        <View style={currentStyles.section}>
                            <Text style={currentStyles.sectionTitle}>Danh hiệu và giải thưởng</Text>
                            <View style={currentStyles.contentRow}>
                                <Text style={currentStyles.field}>{formData.awards || "Các giải thưởng"}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Hobbies */}
                    <View style={currentStyles.column}>
                        <View style={currentStyles.section}>
                            <Text style={currentStyles.sectionTitle}>Sở thích</Text>
                            <View style={currentStyles.contentRow}>
                                <Text style={currentStyles.field}>{formData.hobbies || "Sở thích cá nhân của bạn"}</Text>
                            </View>
                        </View>
                    </View>

                    {/* References */}
                    <View style={[currentStyles.column, currentStyles.lastColumn]}>
                        <View style={currentStyles.section}>
                            <Text style={currentStyles.sectionTitle}>Người giới thiệu</Text>
                            <View style={currentStyles.contentRow}>
                                <Text style={currentStyles.field}>{formData.reference || "Thông tin người giới thiệu"}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Additional Information - Full width */}
                <View style={currentStyles.fullWidthSection}>
                    <Text style={currentStyles.sectionTitle}>Thông tin thêm</Text>
                    <View style={currentStyles.contentRow}>
                        <Text style={currentStyles.field}>{formData.additionalInfo || "Các thông tin bổ sung"}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};