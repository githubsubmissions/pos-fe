# pos-fe

## REACT version: 18.2.0


1. app/
   Contains React components focused on UI and routing.

2. application/
   Encapsulates logic related to the use cases of the application. It’s the place for application services, which
   orchestrate domain logic to achieve specific outcomes.
    - services/: Application services that connect the domain layer and external world (e.g., call a domain method and
      display data in the UI).

3. domain/
   Contains all the core business logic. The domain layer is agnostic to the UI and infrastructure.
    - exceptions/: Custom exceptions specific to business logic.
    - services/: Services that encapsulate domain-related operations (e.g., OrderService).

4. infrastructure/
   This layer manages the interaction with external systems and implements interfaces defined in the domain.
    - persistence/: Manages how data is saved (e.g., in local storage, remote database, etc.).
    - mappers/: Transforms domain models into persistence models and vice versa.

5. test-utils/
   Provides utilities or mock services for testing purposes.

container - IoC, dependencies