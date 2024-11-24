#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

int main() {
    int original_password[8] = {6, 3, 5, 1, 8, 6, 0, 0};
    int password[8], empl_id[10];
    int i, operation;
    char new_name[100], employee_id[11];
    FILE *fp;

    printf("\t\t\t\tWelcome Mr/Mrs [name of CEO]\n");
    printf("\t\t\t\t============================\n");
    printf("\nEnter your 8-digit password: ");

    while (1) {
        for (i = 0; i < 8; i++) {
            char ch = getch();
            printf("*");
            password[i] = ch - '0';
        }

        printf("\n\nYour password is undergoing process of checking\n");

        sleep(2);
        int count = 0;
        for (i = 0; i < 8; i++) {
            if (original_password[i] == password[i]) {
                count++;
            }
        }

        if (count == 8) {
            printf("\nCorrect password!\n");
            sleep(1);
            break;
        } else {
            printf("\nPassword is wrong.\n");
            printf("Re-enter password: ");
        }
    }

    printf("\n\n\t\t\t--> Welcome Sir, you have access to all employee data now.\n\n");
    printf("To add new employee information, press 1.\n");
    printf("To change the information of an employee, press 2.\n");
    printf("Enter your choice: ");
    scanf("%d", &operation);

    getchar();

    switch (operation) {
        case 1:
            printf("Enter the full name of employee [first, middle, last]: ");
            fgets(new_name, sizeof(new_name), stdin);

            new_name[strcspn(new_name, "\n")] = '\0';

            fp = fopen(new_name, "w");
            if (fp == NULL) {
                printf("Error: Could not create entry for employee %s.\n", new_name);
                return 1;
            }

            printf("Employee entry created.\n");

            printf("Create new employee ID (exactly 10 digits): ");
            while(1) {
                fgets(employee_id, sizeof(employee_id), stdin);

                employee_id[strcspn(employee_id, "\n")] = '\0';

                if (strlen(employee_id) != 10) {
                    printf("Employee ID must be exactly 10 digits long. Try again: ");
                    continue;
                }

                int valid = 1;
                for (i = 0; i < 10; i++) {
                    if (employee_id[i] < '0' || employee_id[i] > '9') {
                        valid = 0;
                        break;
                    }
                }

                if (valid) {
                    for (i = 0; i < 10; i++) {
                        empl_id[i] = employee_id[i] - '0';
                    }
                    printf("Employee ID created successfully.\n");
                    break;
                } else {
                    printf("Invalid employee ID. Please enter digits only: ");
                }
            }

            for (i = 0; i < 10; i++) {
                fprintf(fp, "%d", empl_id[i]);
            }

            fclose(fp);
            break;

        case 2:
            printf("Option 2 selected: Change employee information.\n");
            break;

        default:
            printf("\nInvalid choice. Please enter a valid choice.\n");
            break;
    }

    return 0;
}
